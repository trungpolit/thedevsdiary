---
title: "[Microservices 101] Lesson 3: Data Ownership"
date: 2024-06-17T00:10:38+07:00
author: "telion"
tags: ["Microservices 101"]
categories: ["Microservices 101"]
---

{{< youtube 9wLxs9ZV-Do >}}

## Tóm tắt
Quyền sở hữu dữ liệu là một trong những nguyên tắc nền tảng của việc xây dựng microservices. Ý tưởng là mỗi microservice nên sở hữu dữ liệu của riêng mình và chỉ cung cấp dữ liệu đó thông qua các API. Các dịch vụ khác không nên truy cập dữ liệu trực tiếp trong cơ sở dữ liệu. Sự tách biệt này giúp microservices trở nên nhẹ nhàng và cho phép chúng phát triển nội bộ. Nó cũng cho phép kiến trúc lưu trữ đa ngôn ngữ (polyglot persistence), điều không thể thực hiện được nếu các dịch vụ phải chia sẻ một cơ sở dữ liệu.

Các chủ đề:

- Cơ sở dữ liệu nguyên khối vs Cơ sở dữ liệu microservice
- Nguyên tắc độc quyền ghi
- Cung cấp API
- Phát triển dữ liệu
- Lưu trữ đa nguồn
- Version hóa
- Ghép cặp dữ liệu

## Nguồn tham khảo
https://developer.confluent.io/courses/microservices/data-ownership/
