---
title: "[Architecture Weekly] #122: Sự cố Google Cloud, Chuẩn hóa cache, DB in K8S, Cloud without K8S"
date: 2024-06-30T00:10:38+07:00
author: "telion"
tags: ["Google Cloud","Cache","K8S"]
categories: ["Architecture Weekly"]
---

{{< youtube V-kc7_JlsRE >}}

## Chủ đề 1: Sự Cố Xóa Dữ Liệu Của Google Cloud

### Bối cảnh
UniSuper, khách hàng của Google Cloud tại Úc, phát hiện toàn bộ dữ liệu, máy ảo (VMs) và cấu hình mạng của họ biến mất sau một đêm. Họ đã liên hệ với Google Cloud và khôi phục dữ liệu nhờ các bản sao lưu trên Cloud Storage. Gần đây, Google Cloud đã chia sẻ báo cáo về sự cố này.

### Tóm tắt
Trong bài đăng "Chi tiết sự cố Google Cloud GCVE" trên blog của Google Cloud, công ty đã chia sẻ các điểm chính như sau:

- **Phạm vi sự cố**:
    - Ảnh hưởng đến Private Cloud GCVE của UniSuper ở một khu vực.
    - Không ảnh hưởng đến các dịch vụ hoặc khách hàng khác của Google Cloud.
    - Các Private Cloud GCVE khác và bản sao lưu trên Google Cloud Storage không bị ảnh hưởng.

- **Nguyên nhân sự cố**:
    - Do một tham số trống trong công cụ nội bộ dẫn đến việc Private Cloud GCVE của khách hàng bị gán thời hạn mặc định là một năm.
    - Việc này gây ra xóa tự động Private Cloud sau một năm mà không có thông báo cho khách hàng.

- **Nỗ lực khôi phục**:
    - Các đội ngũ của Google và UniSuper làm việc liên tục trong vài ngày để khôi phục Private Cloud, cấu hình mạng, bảo mật, ứng dụng và dữ liệu.
    - Quá trình khôi phục được hỗ trợ bởi quản lý rủi ro mạnh mẽ và sao lưu dữ liệu của UniSuper.

- **Hành động khắc phục**:
    - Thay thế công cụ nội bộ gây sự cố bằng quy trình tự động do khách hàng kiểm soát.
    - Rà soát thủ công để đảm bảo không có triển khai GCVE nào khác gặp rủi ro.
    - Sửa đổi hành vi hệ thống để ngăn chặn sự cố tương tự trong tương lai.

- **Kết luận**:
    - Đây là sự cố đơn lẻ, không phản ánh vấn đề hệ thống của Google Cloud.
    - Google Cloud duy trì các biện pháp bảo vệ mạnh mẽ, bao gồm xóa mềm và thông báo trước.
    - Sự cố nhấn mạnh tầm quan trọng của quản lý rủi ro và hợp tác chặt chẽ với khách hàng để phục hồi nhanh chóng.
    - Google Cloud tiếp tục được công nhận về hạ tầng đám mây ổn định và bền vững.

Bài viết nhấn mạnh tính minh bạch, các biện pháp ngăn chặn sự cố trong tương lai, và sự hiệu quả của việc hợp tác với UniSuper trong quá trình khôi phục.

### Nội dung chi tiết
https://cloud.google.com/blog/products/infrastructure/details-of-google-cloud-gcve-incident

## Chủ đề 2: Cách DoorDash Chuẩn hóa Hệ Thống Cache cho Microservices

### Bối cảnh
Việc cache cho một dịch vụ đơn lẻ thường khá đơn giản, nhưng sẽ ra sao nếu có hàng ngàn dịch vụ? DoorDash đã gặp phải vấn đề này và quyết định giới thiệu một thư viện cache chung cho các microservices viết bằng Kotlin, nhằm giải quyết các vấn đề phổ biến như sự cố Redis và dữ liệu cache lỗi thời.

### Tóm tắt
Dưới đây là những điểm chính về cách DoorDash tái cấu trúc hệ thống cache để nâng cao khả năng mở rộng và hiệu suất:

1. **Hệ thống Cache Phân tán**: Các nhóm tại DoorDash sử dụng nhiều hệ thống cache khác nhau như Caffeine, Redis Lettuce và HashMaps, dẫn đến các vấn đề như dữ liệu cache lỗi thời, phụ thuộc nhiều vào Redis và các key schema không đồng nhất.

2. **Thư viện Cache Chung**: Một nhóm kỹ sư đã tạo ra một thư viện cache chung cho tất cả các microservices của DoorDash, bắt đầu với DashPass, một dịch vụ chính gặp khó khăn về khả năng mở rộng do lưu lượng tăng cao.

3. **API Chung**: Thư viện này định nghĩa một API chung dựa trên hai interface Kotlin: `CacheManager` (tạo cache mới cho một loại key cụ thể) và lớp `CacheKey` (trừu tượng hóa các loại key), giúp các lệnh gọi cache từ logic nghiệp vụ trở nên thống nhất.

4. **Thiết kế Cache Nhiều Lớp**:
   - **Request Local Cache**: Dữ liệu nằm trong một hash map và có thời gian tồn tại gắn liền với request.
   - **Local Cache (Caffeine)**: Chia sẻ dữ liệu giữa các worker trong cùng một Java Virtual Machine (JVM).
   - **Redis Cache (Lettuce)**: Hiển thị cho tất cả các pod trong cùng một cụm Redis.

5. **Kiểm soát Thời gian Thực**: Mỗi lớp cache có thể được bật/tắt, đặt thời gian sống (TTL), hoặc hoạt động ở chế độ shadow (so sánh các yêu cầu cache với nguồn dữ liệu gốc).

6. **Thống kê và Ghi nhật ký**: Hệ thống cache hỗ trợ thu thập số liệu (hits, misses, latency) và ghi nhật ký.

Hệ thống cache mới đã cải thiện đáng kể khả năng mở rộng và an toàn cho tất cả các dịch vụ của DoorDash, giúp các nhóm dễ dàng áp dụng caching khi cần thiết để tối ưu hiệu suất.

### Nội dung chi tiết
https://doordash.engineering/2023/10/19/how-doordash-standardized-and-improved-microservices-caching/

## Chủ đề 3: Xây dựng Cơ Sở Dữ Liệu trong Kubernetes: Có Phải Là Ý Tưởng Tốt?

### Bối cảnh
Các cơ sở dữ liệu giao dịch trực tuyến (OLTP) yêu cầu tính sẵn sàng và hiệu suất cao, phụ thuộc mạnh mẽ vào phần cứng lưu trữ. Trong khi đó, Kubernetes được tối ưu hóa cho các phiên bản ứng dụng có thể thay thế, tạo ra một mâu thuẫn lớn. Vậy, việc xây dựng cơ sở dữ liệu trong Kubernetes có thực sự đáng để thử?

### Tóm tắt
Tác giả thảo luận về các thách thức khi chạy cơ sở dữ liệu trong Kubernetes. Các điểm chính bao gồm:

1. **Kubernetes và Dịch vụ Stateful**:
    - Kubernetes xuất sắc trong việc quản lý các ứng dụng stateless, nhưng gặp nhiều khó khăn với các dịch vụ stateful như cơ sở dữ liệu (Ví dụ như PostgreSQL, MySQL).

2. **Nhược điểm của việc Chạy Cơ sở Dữ liệu trong Kubernetes**:
    - Chạy cơ sở dữ liệu trên EBS hoặc lưu trữ mạng gây ra các vấn đề về độ tin cậy và hiệu suất.
    - Sử dụng ổ đĩa local NVMe cục bộ hiệu suất cao sẽ gắn chặt cơ sở dữ liệu vào các node, làm mất tính linh động, đi ngược lại mục tiêu của Kubernetes.

3. **Tình huống "Đôi Bên Cùng Thiệt (Lose - Lose)"**:
    - Xây dựng cơ sở dữ liệu trong Kubernetes dẫn đến tình trạng "đôi bên cùng thiệt (Lose - Lose)": Kubernetes mất đi sự đơn giản trong quản lý ứng dụng stateless, còn cơ sở dữ liệu gặp vấn đề về độ tin cậy, bảo mật, hiệu suất và độ phức tạp.
    - Đối với những người dùng không sử dụng đám mây, các nhược điểm này vượt trội hơn hẳn so với lợi ích.

4. **Giải pháp Thay thế Tốt hơn**:
    - Cân nhắc sử dụng các giải pháp khác như cơ sở dữ liệu quản lý (Ví dụ như RDS) hoặc các giải pháp RDS mã nguồn mở (Ví dụ như Pigsty) dựa trên phần cứng hoặc hệ điều hành truyền thống.

Tóm lại, cho đến khi lưu trữ mạng có thể vượt trội hơn lưu trữ cục bộ về độ tin cậy và hiệu suất, việc xây dựng cơ sở dữ liệu trong Kubernetes không phải là giải pháp tối ưu.

### Nội dung chi tiết
https://medium.com/@fengruohang/database-in-kubernetes-is-that-a-good-idea-daf5775b5c1f

## Chủ đề 4: Đám Mây Không Cần Kubernetes: Có Thực Sự Khả Thi?

### Bối cảnh
Kubernetes hiện nay được xem là lựa chọn mặc định hầu như ở mọi nơi. Tuy nhiên, việc triển khai Kubernetes đòi hỏi một đội ngũ chuyên sâu, và có thể không phải lựa chọn phù hợp cho tất cả mọi người. Trong bài viết này, tác giả thảo luận về khả năng sử dụng các dịch vụ đám mây mà không phụ thuộc vào Kubernetes.

### Tóm tắt
Trong bài viết "Cloud Without Kubernetes: Is It Possible?" của **Real Kinetic**, tác giả khám phá khả năng sử dụng các dịch vụ đám mây mà không cần dựa vào Kubernetes. Các điểm chính bao gồm:

1. **Độ phức tạp của Kubernetes**:
    - Kubernetes là một công cụ mạnh mẽ nhưng phức tạp, đòi hỏi nhiều chi phí quản lý và thời gian học tập.
    - Đối với các dự án nhỏ hoặc ứng dụng đơn giản, việc triển khai Kubernetes có thể là quá mức cần thiết.

2. **Các giải pháp thay thế Kubernetes**:
    - **Dịch vụ Serverless**: Xem xét sử dụng các dịch vụ serverless (ví dụ như AWS Lambda, Google Cloud Functions) cho các trường hợp cụ thể.
    - **Dịch vụ Đám mây Quản lý**: Tận dụng các dịch vụ đám mây được quản lý sẵn như cơ sở dữ liệu, lưu trữ và các dịch vụ khác mà không cần quản lý cơ sở hạ tầng.
    - **Giải pháp Nền tảng như một Dịch vụ (PaaS)**: Khám phá các giải pháp cung cấp nền tảng dưới dạng dịch vụ để trừu tượng hóa việc quản lý cơ sở hạ tầng.

3. **Sự đánh đổi**:
    - **Linh hoạt vs. Phức tạp**: Kubernetes cung cấp tính linh hoạt nhưng đi kèm với sự phức tạp. Đánh giá xem sự đánh đổi này có xứng đáng với dự án của bạn không.
    - **Phụ thuộc nhà cung cấp**: Sử dụng các dịch vụ đám mây quản lý có thể dẫn đến việc phụ thuộc vào nhà cung cấp. Cân nhắc tính di động và tác động lâu dài.

Kết luận, dù Kubernetes là một công cụ mạnh mẽ để điều phối, việc đánh giá xem nó có phù hợp với nhu cầu và độ phức tạp của dự án hay không là cần thiết. Khám phá các giải pháp thay thế có thể dẫn đến các giải pháp đám mây hiệu quả hơn.

### Nội dung chi tiết
https://www.samsara.com/blog/improving-ci-cd-with-a-focus-on-developer-velocity

