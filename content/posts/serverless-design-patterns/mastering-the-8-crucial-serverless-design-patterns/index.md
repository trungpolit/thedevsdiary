---
title: "Mastering the 8 Crucial Serverless Design Patterns"
date: 2023-08-22T00:10:38+07:00
draft: true
author: "telion"
tags: ["Serverless Design Patterns","Database Design Patterns"]
categories: ["Serverless Design Patterns"]
---

## Giới thiệu
Trong bài viết này, chúng ta sẽ khám phá sức mạnh biến đổi của kiến trúc Serverless và đào sâu vào tám mẫu thiết kế chính mà mỗi nhà phát triển Serverless đầy tham vọng nên am hiểu kỹ. Chuẩn bị để nâng cao kỹ năng của bạn và mở khóa toàn bộ tiềm năng của công nghệ Serverless trong các dự án của bạn.

Các mẫu thiết kế chúng ta sẽ thảo luận bao gồm:
- The Simple Service.
- Storage First Pattern.
- API Proxy Pattern.
- Event Gateway Pattern.
- Call Me ‘Maybe’ Pattern.
- Change Data Capture (CDC) Pattern.
- Transactional Outbox Pattern.
- Saga Pattern.

Sau đó, chúng ta sẽ tiếp tục thảo luận về cách chúng ta có thể kết hợp các mẫu thiết kế lại với nhau để xây dựng gần như bất kỳ trường hợp sử dụng serverless nào.

## 1. The Simple Service

Hãy bắt đầu với dịch vụ phổ biến và đơn giản nhất trong tất cả, "simple service", hay còn được gọi là "Mẫu REST Tiện nghi" ("The Comfortable REST" pattern). Thông thường, kiểu mẫu này sử dụng API Gateway dùng làm API cho các yêu cầu đồng bộ (synchronous requests), với các hàm Lambda làm lớp tính toán và DynamoDB làm nơi lưu trữ dữ liệu. Mẫu này mở rộng rất tốt với khả năng chịu tải đồng thời cao (high-concurrency).

![The Simple Service](The%20Simple%20Service.webp)

Đây là 1 dạng **SALAD** stacks:

- **S** — S3 bucket để lưu trữ ứng dụng giao diện người dùng, ví dụ như ứng dụng React.
- **A** — API Gateway để REST API.
- **LA** — Các hàm Lambda cho lớp tính toán.
- **D** — Bảng DynamoDB để lưu trữ và truy vấn dữ liệu.


Đây được coi như là mẫu 'go to' tiêu chuẩn đối với hầu hết các kỹ sư serverless khi xây dựng các dịch vụ có khả năng mở rộng, và bao phủ khoảng 80-90% các tình huống mà mọi người cần theo quan điểm của tôi.

Các lợi ích của mẫu simple service pattern là:

- Nó rất đơn giản để viết mã và thường gặp đi gặp lại trong hầu hết các thành phần.
- Nó sẽ bao phủ hầu hết các tình huống mà bạn sẽ gặp phải.

Những hạn chế của phương pháp này là gì?

- Bạn không nhận được những lợi ích tiềm năng từ việc tích hợp trực tiếp và có nguy cơ các chức năng của bạn chỉ đơn giản là mã nối (glue code) mà không có bất kỳ logic kinh doanh nào.

## 2. Storage First Pattern
