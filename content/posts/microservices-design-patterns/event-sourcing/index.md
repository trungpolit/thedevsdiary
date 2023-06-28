---
title: "Event Sourcing"
date: 2023-06-28T22:33:24+07:00
author: "telion"
tags: ["Microservice Design Patterns","Database Design Patterns"]
categories: ["Microservice Design Patterns"]
---

## Ngữ cảnh
Trong một hệ thống microservices thông thường, mỗi dịch vụ sẽ cần thực hiện các thao tác như tạo, cập nhật hoặc xóa dữ liệu (hay còn gọi là aggregate) trong cơ sở dữ liệu của nó và gửi các thông điệp hay sự kiện (messages/events) tới một trung tâm điều phối thông điệp (message broker).

Một ví dụ điển hình là dịch vụ tham gia vào một quá trình giao tiếp phức tạp giữa nhiều dịch vụ khác nhau, hay còn gọi là saga. Dịch vụ này cần phải cập nhật dữ liệu liên quan đến saga và gửi các thông điệp hoặc sự kiện. Tương tự, khi một dịch vụ phát hành một sự kiện liên quan đến miền dữ liệu của nó (domain event), nó cũng cần phải cập nhật dữ liệu và phát hành sự kiện.

Một điểm quan trọng trong việc xử lý sự kiện và dữ liệu là việc cập nhật dữ liệu phải được thực hiện một cách nguyên tử (atomically - chắc chắn được cập nhật hết hoặc không được cập nhật gì cả) và việc gửi đi các thông điệp cần phải đúng thứ tự để tránh tạo ra sự không nhất quán và lỗi trong dữ liệu.
Tuy nhiên, việc sử dụng giao dịch phân tán truyền thống (2PC) để thực hiện điều này không thực sự khả thi, vì có thể cơ sở dữ liệu và/hoặc trung tâm điều phối thông điệp (message broker) không hỗ trợ 2PC, và cũng không mong muốn dịch vụ service bị phụ thuộc vào cả hai điều này.

Nhưng, nếu không sử dụng 2PC, việc gửi một thông điệp trong quá trình thực hiện một giao dịch transaction không đáng tin cậy. Không có bảo đảm rằng giao dịch transaction sẽ được xác nhận (commit). Tương tự, nếu một dịch vụ service gửi một thông điệp sau khi xác nhận giao dịch transaction, cũng không có bảo đảm rằng dịch vụ không sẽ bị lỗi (crash) trước khi thông điệp được gửi đi.

Thêm vào đó, thông điệp cần được gửi đến trung tâm điều phối thông điệp (message broker) theo thứ tự mà chúng được gửi bởi dịch vụ. Chúng thường cần được chuyển đến mỗi người dùng (consumer) theo cùng một thứ tự, mặc dù điều này nằm ngoài phạm vi của mẫu thiết kế này.

Ví dụ, giả sử một đơn vị dữ liệu (aggregate) trong hệ thống được cập nhật bởi một chuỗi các giao dịch transactions, T1, T2, v.v. Những giao dịch transactions này có thể được thực hiện bởi cùng một instance của dịch vụ hoặc bởi các instances khác nhau. Mỗi giao dịch sẽ tạo ra một sự kiện tương ứng: giao dịch T1 tạo ra sự kiện E1, giao dịch T2 tạo ra sự kiện E2, v.v. Điều quan trọng là thứ tự của các sự kiện này phải giữ nguyên so với thứ tự của các giao dịch: nếu T1 xảy ra trước T2, thì sự kiện E1 phải được gửi đi (published) trước E2.

## Vấn đề đặt ra
Làm thế nào để cập nhật cơ sở dữ liệu và gửi thông điệp đến một trung tâm điều phối thông điệp (message broker) một cách nguyên tử?

## Yếu tố tác động
- 2PC không phải là một lựa chọn. Cơ sở dữ liệu và/hoặc trung tâm điều phối thông điệp có thể không hỗ trợ 2PC. Hơn nữa, thường không mong muốn để dịch vụ phụ thuộc vào cả cơ sở dữ liệu và trung tâm điều phối thông điệp.
- Nếu giao dịch cơ sở dữ liệu database transaction được xác nhận (commit) thì thông điệp phải được gửi. Ngược lại, nếu cơ sở dữ liệu hủy (rollback) giao dịch, thông điệp không được gửi.
- Thông điệp phải được gửi đến trung tâm điều phối thông điệp (message broker) theo thứ tự chúng được gửi bởi dịch vụ. Thứ tự này phải được bảo tồn qua nhiều service instances mà cập nhật cùng một đơn vị dữ liệu (aggregate).

## Giải pháp
Một giải pháp tốt cho vấn đề này là sử dụng Event Sourcing. Event Sourcing lưu trữ trạng thái của một đối tượng kinh doanh business entity như một Đơn hàng Order hoặc một Khách hàng Customer dưới dạng một chuỗi các sự kiện thay đổi trạng thái. Bất cứ khi nào trạng thái của một đối tượng kinh doanh thay đổi, một sự kiện mới được thêm vào danh sách các sự kiện. Do lưu trữ một sự kiện là một hoạt động đơn lẻ, nó vốn dĩ là nguyên tử (atomic). Ứng dụng tái tạo trạng thái hiện tại của một đối tượng bằng cách phát lại replay các sự kiện.

Các ứng dụng lưu trữ sự kiện trong một kho lưu trữ sự kiện (event store), đây là một cơ sở dữ liệu của các sự kiện. Kho lưu trữ có một API để thêm và lấy các sự kiện của một đối tượng. Kho lưu trữ sự kiện cũng hoạt động như một trung tâm điều phối thông điệp. Nó cung cấp một API cho phép các dịch vụ đăng ký theo dõi các sự kiện. Khi một dịch vụ lưu một sự kiện trong kho lưu trữ sự kiện, nó được gửi đến tất cả các người đăng ký quan tâm.

Một số đối tượng, như một Khách hàng Customer, có thể có một số lượng lớn các sự kiện. Để tối ưu hóa việc tải, một ứng dụng có thể lưu lại một bản chụp (snapshot) về trạng thái hiện tại của một đối tượng từ thời gian này đến thời gian khác. Để tái tạo trạng thái hiện tại, ứng dụng tìm bản chụp gần đây nhất và các sự kiện đã xảy ra từ sau bản chụp đó. Kết quả là, có ít sự kiện cần phải phát lại (replay).

## Ví dụ
"Customers và Orders" là một ví dụ về ứng dụng được xây dựng sử dụng Event Sourcing và CQRS. Ứng dụng được viết bằng Java, và sử dụng Spring Boot. Nó được xây dựng bằng Eventuate, đó là một nền tảng ứng dụng dựa trên Event Sourcing và CQRS.

Sơ đồ sau đây mô tả cách nó lưu trữ các đơn hàng.

![Event Sourcing](storingevents.png)

Thay vì đơn giản chỉ lưu trữ trạng thái hiện tại của mỗi đơn hàng dưới dạng một dòng trong bảng ĐƠN HÀNG (ORDERS), ứng dụng lưu trữ mỗi Đơn hàng dưới dạng một chuỗi sự kiện. Dịch vụ Khách hàng (CustomerService) có thể đăng ký theo dõi các sự kiện đơn hàng và cập nhật trạng thái của chính nó.

Dưới đây là đơn vị dữ liệu Đơn hàng (Order aggregate):
```java
public class Order extends ReflectiveMutableCommandProcessingAggregate<Order, OrderCommand> {

  private OrderState state;
  private String customerId;

  public OrderState getState() {
    return state;
  }

  public List<Event> process(CreateOrderCommand cmd) {
    return EventUtil.events(new OrderCreatedEvent(cmd.getCustomerId(), cmd.getOrderTotal()));
  }

  public List<Event> process(ApproveOrderCommand cmd) {
    return EventUtil.events(new OrderApprovedEvent(customerId));
  }

  public List<Event> process(RejectOrderCommand cmd) {
    return EventUtil.events(new OrderRejectedEvent(customerId));
  }

  public void apply(OrderCreatedEvent event) {
    this.state = OrderState.CREATED;
    this.customerId = event.getCustomerId();
  }

  public void apply(OrderApprovedEvent event) {
    this.state = OrderState.APPROVED;
  }


  public void apply(OrderRejectedEvent event) {
    this.state = OrderState.REJECTED;
  }
```

Dưới đây là một ví dụ về trình xử lý sự kiện (event handler) trong Dịch vụ Khách hàng (CustomerService) đăng ký theo dõi các sự kiện Đơn hàng:
```java
@EventSubscriber(id = "customerWorkflow")
public class CustomerWorkflow {

  @EventHandlerMethod
  public CompletableFuture<EntityWithIdAndVersion<Customer>> reserveCredit(
          EventHandlerContext<OrderCreatedEvent> ctx) {
    OrderCreatedEvent event = ctx.getEvent();
    Money orderTotal = event.getOrderTotal();
    String customerId = event.getCustomerId();
    String orderId = ctx.getEntityId();

    return ctx.update(Customer.class, customerId, new ReserveCreditCommand(orderTotal, orderId));
  }

}
```

Trình xử lý sự kiện này xử lý sự kiện Đơn hàng đã được tạo (OrderCreated) bằng cách cố gắng dành trữ tín dụng cho khách hàng của đơn hàng.

## Kết luận
Event Sourcing mang lại nhiều lợi ích:
- Nó giúp giải quyết một trong những vấn đề lớn khi thực hiện một kiến trúc dựa trên sự kiện, giúp cho việc phát hành các sự kiện một cách đáng tin cậy trở nên khả thi mỗi khi trạng thái thay đổi.
- Do Event Sourcing lưu trữ các sự kiện thay vì các đối tượng miền, nó hầu như tránh được vấn đề không khớp giữa đối tượng và quan hệ trong lập trình cơ sở dữ liệu.
- Event Sourcing cung cấp một nhật ký kiểm toán hoàn toàn đáng tin cậy về những thay đổi đã thực hiện trên một thực thể kinh doanh.
- Nó cho phép thực hiện các truy vấn theo thời gian, cho phép xác định trạng thái của một thực thể vào bất kỳ thời điểm nào.
- Logic kinh doanh dựa trên Event Sourcing gồm các thực thể kinh doanh tách biệt, trao đổi thông tin thông qua sự kiện. Điều này giúp việc chuyển từ một ứng dụng monolithic (đơn khối) sang một kiến trúc microservice trở nên dễ dàng hơn.

Tuy nhiên, Event Sourcing cũng có một số nhược điểm:
- Đây là một cách lập trình không quen thuộc và khác biệt, do đó sẽ có độ dốc học tập.
- Việc truy vấn kho lưu trữ sự kiện thường khó khăn, vì nó yêu cầu tái tạo trạng thái của các thực thể kinh doanh từ các sự kiện, điều này có thể rất phức tạp và không hiệu quả. Do đó, ứng dụng cần phải sử dụng mô hình CQRS để thực hiện các truy vấn. Điều này dẫn đến việc ứng dụng phải xử lý dữ liệu có tính nhất quán cuối cùng.