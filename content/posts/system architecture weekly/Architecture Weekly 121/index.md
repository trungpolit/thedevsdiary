---
title: "[Architecture Weekly] #121: Tái đánh giá về GraphQL, Mở rộng cụm Kubernetes, Chất lượng code, Mô hình C4, Cơ sở hạ tầng tính thuế của Etsy"
date: 2024-06-11T00:10:38+07:00
author: "telion"
tags: ["GraphQL","Kubernetes","Clean Code","C4 Model","Etsy"]
categories: ["Architecture Weekly"]
---

## Chủ đề 1: Tái đánh giá về GraphQL

### Bối cảnh
Cách đây khoảng 5 năm, GraphQL nhận được sự quan tâm đáng kể trong cộng đồng phát triển phần mềm. Nhiều tài liệu như bài đăng trên blog, hội thảo, hướng dẫn thực hành bảo mật đã được xuất bản. Quyết định lựa chọn giữa GraphQL và REST trở thành một chủ đề thảo luận sôi nổi. Tuy nhiên, qua thời gian, các vấn đề về bảo mật và hiệu suất của GraphQL dần được bộc lộ. Bài viết phân tích chi tiết lý do tại sao GraphQL có thể không phải là lựa chọn phù hợp cho mọi dự án.

### Tóm tắt
Tại sao GraphQL không còn là lựa chọn ưu tiên sau 6 năm

* GraphQL tiềm ẩn các rủi ro về bảo mật do API tự mô tả truy vấn có thể bị lộ cho các client không đáng tin cậy, đòi hỏi việc kiểm soát quyền hạn chặt chẽ trên từng trường dữ liệu.
* Các vấn đề về hiệu suất của GraphQL bao gồm việc truy xuất dữ liệu lồng nhau (gây ra nhiều truy vấn N + 1) và kiểm tra quyền hạn phức tạp hơn so với REST.
* GraphQL khuyến khích việc di chuyển logic nghiệp vụ vào lớp vận chuyển, gây khó khăn cho việc kiểm tra và gỡ lỗi.
* GraphQL không thân thiện với các thay đổi đột phá do thiếu công cụ xử lý, dẫn đến phức tạp cho việc quản lý nhiều client.
* Đối với các nhóm có quyền kiểm soát chặt chẽ client, API REST kiểu JSON tĩnh tuân theo chuẩn OpenAPI 3.0+ có thể là lựa chọn thay thế hiệu quả hơn.

### Nội dung chi tiết
https://bessey.dev/blog/2024/05/24/why-im-over-graphql/

## Chủ đề 2: Mở rộng cụm Kubernetes lên 7500 Node

### Bối cảnh
Số lượng pod đang hoạt động trong các cụm Kubernetes của bạn là bao nhiêu? OpenAI đang vận hành cụm Kubernetes với quy mô khổng lồ lên đến 7500 node. Đi kèm với quy mô là những thách thức mới về quản lý địa chỉ IP, giám sát và các vấn đề khác. Bài viết chuyên sâu từ OpenAI cung cấp chi tiết kỹ thuật và gợi ý về khả năng quan sát để triển khai cụm Kubernetes ở quy mô lớn.

### Tóm tắt
* OpenAI đã mở rộng cụm Kubernetes lên 7.500 node để hỗ trợ các mô hình học máy quy mô lớn như GPT-3, CLIP và DALL-E.
* Cơ sở hạ tầng này cho phép tận dụng tài nguyên hiệu quả và đẩy nhanh quá trình nghiên cứu lặp lại.
* Các giải pháp mạng tùy chỉnh và giải quyết địa chỉ IP dựa trên bí danh được sử dụng để giải quyết các thách thức về khả năng mở rộng.
* Prometheus và Grafana được sử dụng để thu thập và giám sát các số liệu theo chuỗi thời gian time-series.
* Kiểm tra sức khỏe 1 cách tự động giúp phát hiện và loại bỏ các node hoạt động bất thường, đảm bảo sự ổn định của cụm.

### Nội dung chi tiết
https://openai.com/index/scaling-kubernetes-to-7500-nodes/

## Chủ đề 3: Mã chất lượng thấp và Mã chất lượng cao: Sự đánh đổi trong phát triển phần mềm

### Bối cảnh
Trong lĩnh vực phát triển phần mềm, các lập trình viên thường nhấn mạnh tầm quan trọng của việc viết mã chất lượng cao (clean code). Tuy nhiên, bài viết này sẽ đưa ra một góc nhìn khác: có những tình huống ưu tiên sử dụng mã chất lượng thấp do các yếu tố liên quan đến chiến lược kinh doanh thay vì kỹ thuật.

### Tóm tắt
* Bài viết phân tích về cuộc tranh luận giữa việc viết mã chất lượng thấp và mã chất lượng cao trong phát triển phần mềm.
* Mã chất lượng cao thường được đánh giá cao về khả năng bảo trì, khả năng kiểm thử và dễ hiểu.
* Tuy nhiên, trong một số trường hợp, việc viết mã chất lượng thấp có thể chấp nhận được, chẳng hạn như khi tình hình kinh doanh không chắc chắn hoặc khi mã chỉ nhằm mục đích tạm thời.
* Tác giả cung cấp ví dụ về việc sử dụng mã chất lượng thấp ban đầu để xác minh thông tin kinh doanh cho một startup, sau đó cấu trúc lại mã để sử dụng lớp trừu tượng khi doanh nghiệp phát triển.
* Bài viết kết luận rằng quyết định giữa viết mã chất lượng thấp và mã chất lượng cao phụ thuộc vào bối cảnh kinh doanh và mục tiêu cụ thể của dự án.

### Nội dung chi tiết
https://vvsevolodovich.dev/shitty-code-is-terrible-innit/

## Chủ đề 4: Mô hình C4: Phương pháp hiệu quả để Mô tả Kiến trúc Phần mềm

### Bối cảnh
Mô hình C4 cung cấp một khuôn mẫu rõ ràng cho các sơ đồ khác nhau, góp phần tài liệu hóa hiệu quả kiến trúc của giải pháp phần mềm. Bài viết của Alex Pliutau đi sâu phân tích tất cả 4 cấp độ của mô hình C4, đồng thời minh họa bằng các ví dụ về biểu diễn dạng mã nguồn (code examples) để tăng tính trực quan.

### Tóm tắt

* Mô hình C4 là một phương pháp được sử dụng rộng rãi để mô tả và truyền đạt kiến trúc phần mềm một cách toàn diện.
* Mô hình này bao gồm bốn cấp độ chính: Bối cảnh (Context), Thùng chứa (Containers), Thành phần (Components) và Mã nguồn (Code).
* Cấp độ Bối cảnh (Context) cung cấp một cái nhìn tổng thể về hệ thống trong tương quan với môi trường hoạt động của nó.
* Cấp độ Thùng chứa (Containers) mô tả cách các đơn vị chức năng khác nhau tương tác và phối hợp với nhau.
* Cấp độ Thành phần (Components) tập trung vào việc hiển thị các khối xây dựng cấu trúc chính của ứng dụng.
* Cấp độ Mã nguồn (Code) là mức chi tiết sâu nhất, sử dụng các biểu diễn dạng mã nguồn (Code) để minh họa cấu trúc phần mềm.

### Nội dung chi tiết
https://packagemain.tech/p/software-architecture-diagrams-c4/

## Chủ đề 5: Cơ sở hạ tầng tính thuế của Etsy

### Bối cảnh
Hoạt động trên hơn 45 quốc gia, việc tuân thủ thuế là một thách thức đáng kể đối với các nền tảng thương mại điện tử. Etsy cần hiển thị thuế suất chính xác trên ứng dụng và phản ánh thuế trên hóa đơn cho người mua ở nhiều khu vực pháp lý khác nhau. Bài viết trên blog của Etsy trình bày cách họ giải quyết vấn đề này thông qua tích hợp với nhà cung cấp dịch vụ thuế của bên thứ ba.

### Tóm tắt

* Etsy hiện đã triển khai hệ thống tính thuế tự động, cho phép thu và nộp thuế từ người mua trên toàn cầu.
* Quy trình tính thuế được xây dựng dựa trên vị trí của người mua và người bán, danh mục sản phẩm và các quy định thuế phức tạp.
* Để đảm bảo tính chính xác và tuân thủ, Etsy hợp tác với Vertex, một nhà cung cấp dịch vụ thuế uy tín. API của Vertex được tích hợp để tự động tính toán thuế suất phù hợp cho từng giao dịch.
* Chi tiết thuế được đồng bộ hóa với Vertex trong suốt vòng đời của đơn hàng, bao gồm cả việc hủy đơn hàng và hoàn tiền.
* Báo cáo thuế chi tiết được tự động tạo và nhập vào hệ thống dữ liệu lớn của Etsy, hỗ trợ phân tích và báo cáo thuế hiệu quả.

### Nội dung chi tiết
https://www.etsy.com/codeascraft/behind-the-scenes---a-glimpse-to-tax-calculations/

