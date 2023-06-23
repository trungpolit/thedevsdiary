---
title: "[Microservice Design Patterns] - Shared Database per Service"
date: 2023-06-23T22:53:03+07:00
author: "telion"
tags: ["Microservice Design Patterns","Database Design Patterns"]
categories: ["Microservice Design Patterns"]
---

## Vấn đề đặt ra
Giả sử, ta cần phát triển 1 ứng dụng online store sử dụng kiến trúc Microservice. Hầu hết các services cần lưu trữ dữ liệu data trong database. Ví dụ, `Order Service` lưu trữ thông tin về orders, `Customer Service` lưu trữ thông tin về customers.

![Shared Database per Service](shared_database_per_service_pattern.png)

## Yêu cầu
- Các service phải được liên kết lỏng lẻo để chúng có thể được phát triển, triển khai và mở rộng một cách độc lập
- Một số business transactions phải thực thi các bất biến trải rộng trên nhiều dịch vụ. Ví dụ, trong trường hợp đặt hàng `Place Order` thì phải kiểm tra xem order mới không được vượt quá hạn mức tín dụng của customer. Các business transactions khác, phải cập nhật dữ liệu thuộc sở hữu của nhiều dịch vụ.
- Một số business transactions cần truy vấn dữ liệu được sở hữu bởi các services khác. Ví dụ, `View Available Credit` phải truy vấn dữ liệu từ `Customer` để xem hạn mức tín dụng của customer.
- Một số truy vấn cần phải join data từ nhiều services. Ví dụ, việc tìm kiếm các customers trong 1 vùng nhất định và các đơn hàng orders gần đây của họ, cần phải join data từ `Customer` và `Order`.

## Giải pháp
Chúng ta có thể sử dụng 1 database được chia sẻ chung giữa các microservice. Mỗi service được tự do sử dụng dữ liệu mà có thể truy cập vào các dịch vụ khác. database sẽ đáp ứng các bài toán cần các giao dịch ACID.

## Ví dụ
`OrderService` và `CustomerService` được tự do truy cập các tables của service kia. Ví dụ, `OrderService` có thể sử dụng ACID transaction sau để đảm bảo rằng order mới không được tạo ra nếu credit limit của customer không đủ.

```sql
BEGIN TRANSACTION
…
SELECT * FROM ORDERS WHERE CUSTOMER_ID = ?
…
SELECT CREDIT_LIMIT FROM CUSTOMERS WHERE CUSTOMER_ID = ?
…
INSERT INTO ORDERS ... WHERE ORDER_LIMIT < CREDIT_LIMIT
…
COMMIT TRANSACTION
```
Database sẽ đảm bảo giới hạn tín dụng credit limit sẽ không bị vượt quá ngay cả khi các giao dịch đồng thời cố gắng tạo đơn đặt hàng cho cùng một khách hàng.

## Kết luận
Ưu điểm của mẫu thiết kế này:
- Nhà phát triển sử dụng các giao dịch ACID quen thuộc và đơn giản để thực thi tính nhất quán của dữ liệu
- Một database đơn giản hơn để vận hành

Nhược điểm:
- Việc phát triển bị ràng buộc, ví dụ `OrderService` cần phối hợp với các thay đổi schema changes với các services khác mà có tác động tới cùng bảng tables. Việc này có thể dẫn tới việc phải phối hợp với các nhóm phát triển khác, làm chậm tốc độ phát triển.
- Ràng buộc khi chạy runtime - bởi vì tất cả các services đều truy cập vào cùng một database nên chúng có khả năng can thiệp lẫn nhau. Ví dụ: nếu giao dịch `CustomerService` đang chạy trong thời gian dài giữ khóa trên bảng `ORDER` table thì `OrderService` sẽ bị chặn.
- Một Database đơn lẻ có thể không đáp ứng yêu cầu truy cập và lưu trữ dữ liệu của tất cả các services.