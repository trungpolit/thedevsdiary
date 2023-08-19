---
title: "Bottleneck #01: Tech Debt"
date: 2023-08-19T00:21:33+07:00
author: "telion"
tags: ["Bottlenecks of Scaleups", "Tech Debt"]
categories: ["Bottlenecks of Scaleups"]
---

Trong những ngày đầu, một startup tìm kiếm sự phù hợp giữa sản phẩm (product) và thị trường (market). Khi tìm được, nó tìm cách phát triển nhanh chóng, giai đoạn này được gọi là scaleup. Tại thời điểm này, nó đang phát triển nhanh chóng trên nhiều khía cạnh: doanh thu (revenues), khách hàng (customer), số lượng nhân viên (headcount). Tại Thoughtworks, chúng tôi đã làm việc với nhiều startup đang trong giai đoạn scaleup như vậy, và công việc của chúng tôi tập trung vào cách giúp họ vượt qua các nút thắt (bottlenecks) cản trở sự phát triển.

Khi thực hiện công việc này, chúng tôi đã nhận biết các nút thắt phổ biến và học cách tiếp cận để giải quyết chúng. Bài viết này là bài đầu tiên trong một loạt bài nói về vấn đề "Bottlenecks of Scaleups". Trong mỗi bài, chúng tôi sẽ xem xét cách mà các startup rơi vào nút thắt, thông qua việc họ thường làm đúng những điều cần thiết trong giai đoạn đầu khi khởi nghiệp, nhưng họ không còn làm đúng nữa khi tốc độ tăng trưởng thay đổi bối cảnh cách thức làm việc. Chúng tôi sẽ nêu bật các dấu hiệu chính cho thấy startup đang đến gần hoặc bị mắc kẹt trong nút thắt. Sau đó, chúng tôi sẽ thảo luận cách vượt qua nút thắt, mô tả những thay đổi giúp những startup trong giai đoạn scaleup đạt đúng tiềm năng của mình.

Chúng tôi bắt đầu loạt bài này bằng cách xem xét nợ kỹ thuật: các công cụ và phương pháp hỗ trợ thử nghiệm nhanh sản phẩm/thị trường phù hợp với yêu cầu thay đổi nhanh chóng khi bắt đầu tăng trưởng.

## Cách chúng ta nhận biết mình rơi vào tình trạng 'nút thắt' (bottleneck)?
Nút thắt phát triển mà chúng tôi thường gặp nhất chính là nợ kỹ thuật (technical debt). Các startups thường nói rằng nợ kỹ thuật (technical debt) chính là trở ngại lớn nhất trước quá trình phát triển của họ. Khái niệm "nợ kỹ thuật" (tech debt) thường được dùng một cách chung chung, thể hiện rằng nền tảng công nghệ (technical platform) hiện tại cần được nâng cấp. Họ cảm nhận việc phát triển tính năng (feature development) trở nên chậm chạp, gặp vấn đề về chất lượng và sự không hài lòng từ phía đội ngũ kỹ sư (engineering team). Các startups thường cho rằng mình đã mắc nợ kỹ thuật bởi họ không đầu tư kỹ lưỡng về mặt công nghệ trong giai đoạn phát triển. Để hiểu rõ hơn về nợ kỹ thuật, chúng ta cần một bước phân tích sâu rộng. Có thể chất lượng code không đạt, sử dụng ngôn ngữ hay framework đã lạc hậu, hoặc việc triển khai (deployment) và vận hành sản phẩm chưa thực sự tự động. Giải pháp có thể là điều chỉnh quy trình làm việc hoặc xây dựng lại một số phần của ứng dụng (application).

Đáng lưu ý rằng việc chấp nhận một lượng nợ kỹ thuật (prudent technical debt) hợp lý là điều cần thiết và hữu ích, đặc biệt ở những bước đầu tiên của một startup. Họ nên đánh đổi giữa chất lượng kỹ thuật và tốc độ ra mắt sản phẩm. Điều này giúp startup nhanh chóng đạt được mục tiêu đầu tiên: mô hình kinh doanh khả thi, sản phẩm đã được thử nghiệm và sự yêu mến từ khách hàng. Nhưng khi công ty muốn mở rộng (scale up), chúng ta cần xử lý những "lối tắt" đã tạo ra, nếu không chúng sẽ nhanh chóng ảnh hưởng tới hiệu quả kinh doanh.

Hãy cùng xem qua một vài trường hợp thực tế mà chúng tôi đã gặp.

**Công ty A** - Một startup đã xây dựng một sản phẩm dựa trên phương pháp MVP và đã chứng minh dựa trên bằng chứng (lưu lượng người dùng, cảm nhận của người dùng, doanh thu) để thuyết phục các nhà đầu tư và thu được vòng đầu tư tiếp theo. Giống như hầu hết các MVP, nó được xây dựng ưu tiên dựa trên phản hồi từ người dùng hơn là kiến trúc kỹ thuật chất lượng cao. Sau khi thu được vốn đầu tư, thay vì tái xây dựng phiên bản thử nghiệm đó, họ tiếp tục phát triển trên nền tảng đó, giữ vững đà phát triển bằng cách tập trung vào các tính năng (features). Điều này có thể không phải là vấn đề ngay lập tức vì startup có một đội ngũ nhỏ gồm những người có kinh nghiệm biết rõ những khó khăn và có thể áp dụng giải pháp tạm thời để giữ công ty hoạt động.

Vấn đề bắt đầu xuất hiện khi đội ngũ tiếp tục tập trung vào việc phát triển tính năng mà không giảm bớt nợ kỹ thuật (technical debt). Theo thời gian, MVP chất lượng thấp trở thành các thành phần chính, mà không có hướng rõ ràng để cải thiện hay thay thế chúng. Việc học, làm việc và hỗ trợ mã nguồn (code) gặp nhiều trở ngại. Việc mở rộng đội ngũ hoặc bộ tính năng trở nên ngày càng khó khăn. Những người lãnh đạo kỹ thuật cũng rất lo lắng về việc mất đi những kỹ sư gốc và kiến thức mà họ đang có.

Cuối cùng, việc thiếu đầu tư kỹ thuật dần trở nên trầm trọng. Đội ngũ bị "tê liệt", thể hiện qua tốc độ làm việc chậm và sự thất vọng của đội ngũ. Startup phải bỏ công sức lớn và chi phí đáng kể để tái xây dựng lại hệ thống, có nghĩa là việc phát triển tính năng phải chậm lại, cho phép đối thủ bắt kịp.

**Công ty B** - Công ty này được sáng lập bởi các kỹ sư kỳ cựu và họ muốn làm mọi thứ "đúng" về mặt kỹ thuật ngay từ đầu. Công ty được xây dựng để mở rộng ngay từ đầu. Họ sử dụng những thư viện và ngôn ngữ lập trình mới nhất. Có một kiến trúc rất tinh vi, cho phép mỗi phần của ứng dụng được thực hiện bằng công nghệ khác nhau, mỗi công nghệ đều được tối ưu hóa hoàn hảo. Kết quả là, nó sẽ dễ dàng xử lý sự tăng trưởng mạnh mẽ khi công ty đạt đến mức đó.

Vấn đề ở đây là việc xây dựng mất quá nhiều thời gian, phát triển tính năng chậm, và nhiều kỹ sư tập trung vào nền tảng (platform) hơn là sản phẩm. Cũng rất khó khăn để thử nghiệm - với kiến trúc tinh vi, những ý tưởng sản phẩm không phù hợp với kiến trúc dịch vụ hiện có sẽ gặp khó khăn để triển khai. Công ty không nhận thấy giá trị của kiến trúc có khả năng mở rộng vì nó không thể tìm ra sự phù hợp giữa sản phẩm và thị trường để đạt đến quy mô khách hàng như vậy.

Đây là hai ví dụ cực đoan, dựa trên sự kết hợp của nhiều khách hàng mà đội ngũ startup tại Thoughtworks đã làm việc. Công ty A rơi vào tình trạng nợ kỹ thuật khiến công ty bị "tê liệt". Công ty B đã để tâm quá mức đến kỹ thuật (over-engineered), làm chậm sự phát triển và hạn chế khả năng thay đổi nhanh chóng để thích ứng với yêu cầu mới từ thị trường.

Vấn đề chung gặp phải của cả hai là không thể tìm ra sự cân bằng giữa đầu tư kỹ thuật và việc phát triển sản phẩm. Lý tưởng nhất là chúng ta chấp nhận nợ kỹ thuật hợp lý để đẩy mạnh việc phát triển tính năng và thử nghiệm. Khi các ý tưởng được xác định là có giá trị, chúng ta nên trả nợ kỹ thuật. Dù điều này rất dễ nói, nhưng việc áp dụng vào thực tế có thể gặp nhiều thách thức.

Để tìm ra cách tạo ra sự cân bằng đúng đắn, chúng ta sẽ xem xét các loại nợ kỹ thuật khác nhau:

### Các loại nợ tiêu biểu

Nợ kỹ thuật (technical debt) là một thuật ngữ mơ hồ, thường chỉ được xem xét liên quan đến mã nguồn (code). Trong bài thảo luận này, chúng ta sẽ sử dụng nợ kỹ thuật để chỉ bất kỳ lối tắt kỹ thuật nào, nơi chúng ta đang đánh đổi sự đầu tư dài hạn vào nền tảng kỹ thuật để phát triển tính năng ngắn hạn.

#### Chất lượng mã nguồn (Code quality)
Mã nguồn kém chất lượng, khó kiểm thử, khó hiểu hoặc được tài liệu hóa kém sẽ làm chậm tất cả các công việc phát triển và bảo trì và làm giảm "niềm vui" của việc viết mã, đồng thời làm mất động lực cho các kỹ sư.

#### Kiểm tra (Testing)
Thiếu kiểm thử unit test, integration hoặc E2E test. Các nhà phát triển không thể nhanh chóng tin tưởng rằng mã của họ sẽ không làm hỏng các chức năng và phụ thuộc hiện có.

#### Kết nối (Coupling)
Giữa các module (thường xuất hiện trong một hệ thống monolith), các đội có khả năng cản trở lẫn nhau, do đó giảm tần suất triển khai và tăng thời gian chờ cho các thay đổi. Một giải pháp là tách dịch vụ ra thành microservices (lưu ý rằng: microservices cũng khá phức tạp) — có thể thực hiện bằng những cách tiếp cận đơn giản hơn để thiết lập ranh giới rõ ràng trong hệ thống monolith.

#### Tính năng không được sử dụng hoặc có giá trị thấp
Không thường được coi là nợ kỹ thuật, nhưng một trong những triệu chứng của nợ kỹ thuật là mã lập trình khó làm việc. Nhiều tính năng tạo ra nhiều điều kiện, nhiều trường hợp biên mà các lập trình viên phải thiết kế xung quanh. Điều này làm giảm tốc độ bàn giao sản phẩm. Một startup thì rất hay làm các thử nghiệm, chúng ta nên luôn đảm bảo quay lại và đánh giá lại kết quả thử nghiệm (tính năng) đang hoạt động, và nếu không hiệu quả, hãy xóa bỏ nó. Về mặt cảm xúc, có thể rất khó khăn cho các đội ngũ để đưa ra một quyết định, nhưng điều này trở nên dễ dàng hơn khi bạn có dữ liệu khách quan định lượng giá trị của tính năng.

#### Thư viện hoặc frameworks lỗi thời
Nhóm phát triển sẽ không thể tận dụng những cải tiến mới và dễ bị tổn thương trước các vấn đề bảo mật. Điều này sẽ dẫn đến một vấn đề về kỹ năng, làm chậm quá trình tuyển dụng và đào tạo nhân viên mới và làm khó chịu cho các lập trình viên hiện tại, khi họ buộc phải làm việc với phiên bản cũ. Thêm vào đó, những framework cũ kỹ thường giới hạn việc nâng cấp và đổi mới trong tương lai.

#### Công cụ (Tooling)
Các sản phẩm hoặc công cụ của bên thứ ba không tối ưu cần nhiều bảo trì. Bối cảnh thay đổi liên tục, và có thể có công cụ hiệu quả hơn đã xuất hiện trên thị trường. Lập trình viên cũng tự nhiên muốn làm việc với những công cụ hiệu quả nhất. Việc cân nhắc giữa việc mua sắm so với việc tự xây dựng là phức tạp và cần được đánh giá lại cùng với các khoản nợ (technical debt) còn lại.

#### Các vấn đề kỹ thuật về độ tin cậy và hiệu suất
Điều này có thể ảnh hưởng đến trải nghiệm của khách hàng và khả năng mở rộng quy mô. Chúng ta phải cẩn thận, vì chúng ta đã thấy sự lãng phí nỗ lực trong việc tối ưu hóa quá sớm khi mở rộng quy mô cho một tình huống giả định trong tương lai. Tốt hơn là có một sản phẩm đã được chứng minh là có giá trị với người dùng hơn là một sản phẩm chưa được chứng minh có thể mở rộng quy mô.

#### Quy trình thủ công (Manual processes)
Một phần của quy trình phân phối sản phẩm không được tự động hóa. Đây có thể là các bước trong quy trình làm việc của nhà phát triển hoặc những thứ liên quan đến việc quản lý hệ thống sản xuất. Một cảnh báo: điều này cũng có thể diễn ra theo chiều ngược lại khi bạn dành nhiều thời gian để tự động hóa thứ gì đó không được sử dụng đủ để xứng đáng với khoản đầu tư.

#### Triển khai tự động (Automated deployments)
Các startup ở giai đoạn đầu có thể sử dụng một cài đặt đơn giản, nhưng điều này nên được giải quyết sớm — việc cải tiến tự động hóa từng chút giúp gia tăng tấc độ phân phối các thử nghiệm trên sản phẩm.

#### Chia sẻ kiến thức (Knowledge sharing)
Thiếu thông tin hữu ích là một dạng nợ kỹ thuật. Nó gây khó khăn cho nhân viên mới và các nhóm phụ thuộc để bắt kịp tốc độ. Theo thông lệ tiêu chuẩn, các nhóm phát triển nên tạo tài liệu kỹ thuật bằng văn bản ngắn gọn, các đặc tả về API và các tài liệu hồ sơ quyết định kiến trúc. Nó cũng nên được tìm kiếm dễ dàng thông qua một cổng thông tin dành cho nhà phát triển hoặc công cụ tìm kiếm. lưu ý: Anti-pattern là không có quy trình kiểm duyệt và loại bỏ các phần ngừng sử dụng để đảm bảo chất lượng.

### Cách phân biệt nợ kỹ thuật (technical debt) và tính năng
Các startup thường kể với chúng tôi về việc họ bị chìm trong nợ kỹ thuật, nhưng khi kiểm tra kỹ lưỡng, họ thực sự đang nói đến tính năng đang bị hạn chế của nền tảng kỹ thuật, cái mà cần một sự xử lý đúng đắn với việc lập kế hoạch, thu thập yêu cầu và nguồn lực dành riêng để triển khai.

Ví dụ, các đội ngũ startup của Thoughtworks thường làm việc với khách hàng về việc tự động hóa tiếp nhận khách hàng. Họ có thể có một giải pháp dành riêng với ít tính tự động. Ban đầu mọi thứ diễn ra khá tốt - các nhà phát triển có thể thiết lập tài khoản một cách thủ công và theo dõi sự khác biệt giữa các bản cài đặt. Nhưng, khi bạn thêm nhiều khách hàng hơn, việc này trở nên quá mất thời gian cho các nhà phát triển. Vì vậy, startup có thể thuê nhân viên vận hành bên ngoài để thiết lập tài khoản cho khách hàng. Khi cơ sở người dùng và chức năng phát triển, việc quản lý các bản cài đặt khác nhau trở nên ngày càng phức tạp - thời gian tiếp nhận khách hàng tăng lên và vấn đề về chất lượng cũng tăng. Tại thời điểm này, việc tự động hóa việc triển khai và cấu hình hoặc chuyển sang cài đặt đa dạng sẽ ảnh hưởng trực tiếp đến các chỉ số KPI - đây là một tính năng cần được phát triển hơn là một nợ kỹ thuật.

Các dạng nợ kỹ thuật khác khó phát hiện hơn và khó chỉ ra tác động trực tiếp hơn, chẳng hạn như mã khó xử lý hoặc các quy trình thủ công lặp đi lặp lại trong thời gian ngắn. Cách tốt nhất để xác định chúng là thông tin phản hồi từ các nhóm trải nghiệm chúng hàng ngày. Quy trình cải tiến liên tục của nhóm có thể xử lý vấn đề đó và không cần phải có sáng kiến riêng để khắc phục.

## Các dấu hiệu cho thấy bạn đang tiến gần đến nút cổ chai mở rộng quy mô (scaling bottleneck)
### Giá trị theo thời gian
Xem xét quá trình từ đầu đến cuối của việc cung cấp giá trị cho người dùng và xu hướng của nó theo thời gian sẽ làm nổi bật sự ma sát giữa nợ kỹ thuật và các vấn đề khác.

### Tác động đến người dùng cuối
Độ trễ trong các hệ thống, thời gian tiếp nhận khách hàng, và các vấn đề về chất lượng sẽ ảnh hưởng đến khách hàng - một lối tắt kỹ thuật có thể là nguyên nhân gốc rễ.

### Sự hài lòng của kỹ sư
Có nhiều sản phẩm trong hệ thống của bạn: một là trải nghiệm của người dùng và một là trải nghiệm của nhân viên và nhà phát triển. Lắng nghe những phàn nàn của nhà phát triển sẽ đưa ra các vấn đề cốt lõi trong nền tảng kỹ thuật, cho phép ưu tiên những gì sẽ ảnh hưởng đến họ nhiều nhất.

### Khả năng tiếp nhận nhà phát triển mới
Xem xét quá trình tiếp nhận và sự hài lòng của nhà phát triển mới có thể làm nổi bật các vấn đề, mà nhân viên lâu năm đã hình thành thói quen khó có thể nhận ra.

### Suy giảm trong các biện pháp phi chức năng
Chi phí cơ sở hạ tầng, hiệu suất và khả năng sẵn sàng của hệ thống có thể là các chỉ số gián tiếp của nợ kỹ thuật quá mức ảnh hưởng đến kết quả kinh doanh.

Nếu bạn đã thấy bất kỳ dấu hiệu nào như trên, thì lộ trình sản phẩm (product roadmap) của bạn nên đạt mục tiêu để đầu tư cải tiến nó. Ảnh hưởng tiêu cực lớn nhất của nợ kỹ thuật là gây khó khăn cho việc phát triển những tính năng cần có trong tương lai của sản phẩm.

## Làm thế nào để thoát khỏi nút thắt
Phương pháp đối mặt với nợ kỹ thuật nên xuất phát từ chiến lược kỹ thuật của đội và được đặt ra bởi các nhà lãnh đạo của nó. Nó nên được thực hiện một cách có chủ đích, rõ ràng và được đánh giá lại theo thời gian. Thật không may, chúng ta thường thấy các đội làm việc theo hướng dẫn lịch sử, tạo ra vấn đề cho tương lai mà họ không nhận thức được. Đối với một công ty trong tình thế này, có một số thời điểm họ nên xem xét đánh giá lại chiến lược hiện tại của họ:
- Khi có nguồn tài trợ mới đồng nghĩa với việc có nhiều tính năng và nguồn lực hơn - điều này sẽ làm gia tăng các vấn đề hiện tại. Giải quyết nợ kỹ thuật hiện tại nên là một phần của kế hoạch tài trợ.
- Hướng phát triển mới của sản phẩm có thể không đúng với các giả định trước đó và đặt áp lực lên các phần mới của hệ thống.
- Một quy trình quản trị tốt liên quan đến việc đánh giá lại trạng thái công nghệ theo khoảng thời gian một cách đều đặn.
- Những ý kiến mới có thể giúp tránh được vấn đề tiềm tàng khó phát hiện. Sự trợ giúp từ bên ngoài, luân chuyển nhóm và nhân viên mới sẽ mang đến một viễn cảnh mới mẻ.

### Nợ kỹ thuật ngày càng tăng và có xu hướng tụt dốc không phanh
Làm thế nào bạn lại có rất nhiều nợ kỹ thuật? Việc xác định điều này có thể rất khó khăn. Thông thường, điều này không phải là do một sự kiện hoặc quyết định duy nhất, mà thay vào đó là một chuỗi các quyết định và sự đánh đổi được thực hiện dưới áp lực.

Một cách kỳ lạ, khi nhìn lại, nếu người ta xem xét mỗi quyết định tại thời điểm nó được đưa ra, dựa trên những gì đã biết vào thời điểm đó, khó có khả năng xem đó là một sai lầm. Tuy nhiên, một sự nhượng bộ dẫn đến sự nhượng bộ khác và cứ như vậy, cho đến khi bạn gặp vấn đề nghiêm trọng về chất lượng. Thường có một điểm nghiêng mà việc giải quyết nợ kỹ thuật tốn nhiều thời gian hơn so với việc phát triển giá trị tăng thêm.

Việc phục hồi là khó khăn và tình hình có xu hướng tụt dốc. Điều này là tự nhiên khi các nhà phát triển sử dụng tình trạng hiện tại như một chỉ dẫn cho những điều được chấp nhận. Trong điều kiện như vậy, việc phát triển các tính năng mới sẽ dẫn đến thêm nợ. Đây chính là con đường trượt dốc, một vòng luẩn quẩn đáng ghét mà đáng tiếc dẫn đến vực thẳm khi nỗ lực để triển khai tính năng tiếp theo tăng không tuyến tính.

### Thiết lập một tiêu chuẩn chất lượng
Nhiều tổ chức thấy rằng việc có một bộ tiêu chuẩn và phương pháp mà công ty cam kết tuân theo sẽ định hướng sự phát triển kỹ thuật. Hãy lưu ý rằng một số phương pháp kỹ thuật khá khó để thực hiện, ví dụ như phân phối liên tục (continuous delivery); việc triển khai thường xuyên mà không ảnh hưởng đến người dùng là một thách thức về mặt kỹ thuật. Các đội thường gặp vấn đề khi triển khai ban đầu, và phản ứng lại, lãnh đạo có thể e ngại và hạ thấp ưu tiên cho phương pháp đó. Tuy nhiên, chúng tôi lại khuyến nghị điều ngược lại, hãy thực hiện nó thường xuyên hơn và đội của bạn sẽ thành thạo các phương pháp và hình thành những thói quen mạnh mẽ. Khi gặp khó khăn, thay vì bỏ qua phương pháp, hãy sử dụng phản hồi để định hướng việc đầu tư trong tương lai vào năng lực của đội.

### Giới hạn bán kính tác động
Chúng ta chấp nhận việc lấy đường tắt là một phần cần thiết của việc mở rộng doanh nghiệp. Vậy làm thế nào chúng ta giới hạn bán kính tác động, biết rằng những lối tắt này sẽ cần được giải quyết, hoặc thậm chí được xây dựng lại từ đầu? Rõ ràng chúng ta cần một chiến lược giới hạn tác động đến doanh nghiệp. Một cách là tách biệt các đội và hệ thống, điều này cho phép một đội giải quyết nợ kỹ thuật một cách độc lập và không bị rơi vào tình trạng trượt dốc như ở trên.

Có rất nhiều tài liệu chất lượng cao về việc phân tách (decoupling), vì vậy chúng tôi sẽ không cố gắng giải thích ở đây. Chúng tôi khuyên bạn nên tập trung chú ý vào các kỹ thuật thiết kế hướng domain và microservices. Tuy nhiên, hãy cẩn thận khi thực hiện quá nhiều thứ quá sớm, việc tách rời sẽ làm tăng thêm độ trễ và độ phức tạp cho hệ thống của bạn, đồng thời việc chọn ranh giới domain kém giữa các nhóm có thể gây thêm khó khăn trong giao tiếp.

### Hợp tác giữa Đội Sản phẩm và Kỹ thuật
Nếu những cuộc thảo luận về việc đánh đổi không được cân nhắc giữa chiến lược kinh doanh, sản phẩm và kỹ thuật, chất lượng kỹ thuật thường bị giảm sút trước tiên, và kết quả là chất lượng sản phẩm cũng bị ảnh hưởng sau cùng. Khi bạn tìm kiếm nguyên nhân gốc rễ của sự cản trở này, hầu như luôn xuất phát từ sự cân nhắc giữa mục tiêu kinh doanh, sản phẩm và kỹ thuật. Sự thiếu hợp tác thường dẫn đến những quyết định thiển cận được đưa ra trong một không gian riêng biệt. Vấn đề này có thể xuất hiện ở cả hai hướng: việc cắt giảm ở những lĩnh vực quan trọng hoặc làm quá mức cho một thứ không mang lại giá trị đều có khả năng xảy ra.

![Product and Engineering Collaboration](product-eng-collaboration.png)

- Chiến lược kinh doanh tại bất kỳ thời điểm nào cũng nên rõ ràng và minh bạch.
- Chúng ta ủy quyền cho các nhóm lãnh đạo để đưa ra những quyết định có lợi cho doanh nghiệp.
- Đội Sản phẩm và Kỹ thuật nên có một vị trí ngang bằng, tin tưởng lẫn nhau, và sẵn lòng đưa ra những quyết định đánh đổi dựa trên ảnh hưởng dài hạn và ngắn hạn đối với doanh nghiệp.
- Quyết định được đưa ra dựa trên dữ liệu - ví dụ: tình trạng hiện tại của nền tảng kỹ thuật, ước lượng, phân tích về giá trị dự kiến và cải thiện KPI, nghiên cứu người dùng, kết quả thử nghiệm A/B.
- Quyết định được xem xét lại khi dữ liệu được tinh chỉnh hoặc phát hiện ra những kiến thức mới.

### Chiến lược để giảm thiểu tác động của nợ kỹ thuật (technical debt)
Khi nghĩ về chiến lược cho một startup, và cách nó mở rộng, chúng tôi thích sử dụng mô hình bốn giai đoạn để hiểu các giai đoạn khác nhau của sự phát triển của một startup.

#### Giai đoạn 1: Thí nghiêm (Experimenting)
Tạo ra Nguyên mẫu (Prototypes) - phần mềm bán chức năng để chứng minh sản phẩm, chuyển dịch theo chức năng với sự quan tâm ngày càng tăng

#### Giai đoạn 2: Đạt được sự quan tâm (Getting Traction)
Quyết định về hệ sinh thái - nhà cung cấp đám mây, lựa chọn ngôn ngữ, kiểu tích hợp dịch vụ

Thay thế phần mềm nguyên mẫu cho các hệ thống cốt lõi

Thiết lập nền tảng ban đầu - thử nghiệm, CI/CD, API, giám sát, phân tích

Thiết lập các miền rộng, đặt ranh giới mềm ban đầu (bằng mã)

#### Giai đoạn 3: (Siêu) tăng trưởng (Hypergrowth)
Tạo các nhóm sản phẩm tách rời quản lý các dịch vụ của riêng chúng

Thiết lập SLA và tiêu chuẩn chất lượng, được liên kết với các tín hiệu xung quanh trải nghiệm của khách hàng về sản phẩm

Thành lập các nhóm nền tảng tập trung vào hiệu quả của các nhóm sản phẩm

#### Giai đoạn 4: Tối ưu hoá (Optimizing)
Đánh giá lại SLA và tiêu chuẩn chất lượng tập trung vào năng suất và bảo trì dài hạn

Kiểm tra trạng thái của nền tảng kỹ thuật, tài trợ cho các sáng kiến trong nhóm sản phẩm và tạo nhóm tạm thời để khắc phục khoản nợ kỹ thuật lớn nhất

Xây dựng lại hoặc mua các tiện ích để cải thiện hiệu quả

Huấn luyện các đội về cách thực hành kỹ thuật có chất lượng tốt

### Làm thế nào để giải quyết nợ kỹ thuật (technical debt)
Quá trình giải quyết nợ kỹ thuật bắt đầu bằng việc chia sẻ thông tin minh bạch (**transparent information**) về tình hình kinh doanh, hướng phát triển sản phẩm hiện tại, số liệu về khả năng mở rộng hiện tại, ý kiến của khách hàng về sản phẩm và những gì bộ phận hỗ trợ khách hàng và hoạt động vận hành thấy được. Thông tin này sẽ giúp các chuyên gia công nghệ đưa ra quyết định dựa trên thông tin có căn cứ. Chia sẻ dữ liệu về thách thức hiện tại giúp các chuyên gia công nghệ hiểu tại sao các vấn đề đang được giải quyết và đo lường thành công của họ.

Cần có sự sở hữu rõ ràng từ đầu đến cuối (**clear end-to-end ownership**) đối với tất cả sản phẩm và hệ thống liên quan của chúng. Khi các nhóm phát triển mở rộng và chịu trách nhiệm cho các lĩnh vực tương ứng, thường không có sự sở hữu rõ ràng cho một hành trình từ đầu đến cuối, điều này tạo ra những khoảng trống kỹ thuật thường được lấp đầy bằng nợ kỹ thuật. Khi các nhóm phát triển mở rộng và đảm nhận nhiệm vụ mới, việc tìm chủ sở hữu cho mã nguồn cũ ngày càng khó khăn hơn. Hơn nữa, thiếu sự sở hữu sẽ khiến các nhóm không có động cơ để khắc phục vấn đề.

Chúng ta cần trao quyền cho các nhóm (**empower teams**) để khắc phục vấn đề — việc giải quyết nợ kỹ thuật nên là một phần tự nhiên trong quá trình phát triển sản phẩm. Các kỹ sư và quản lý sản phẩm cần thỏa thuận sự cân bằng hợp lý giữa nợ kỹ thuật và chức năng với tư duy thiết thực đúng đắn. Điều này là một phần công việc của một nhóm sản phẩm để duy trì và bảo tồn các sản phẩm kỹ thuật lành mạnh, không phải là điều được thực hiện sau cùng. Nên có một quy trình được thống nhất để tiếp cận và theo dõi nợ kỹ thuật liên tục. Điều này đòi hỏi các sự đánh đổi khó khăn giữa các lãnh đạo kỹ thuật và sản phẩm để duy trì sự cân bằng ổn định.

Cách thiết kế cấu trúc nhóm đúng cách cũng có thể là yếu tố quan trọng. Ví dụ, giả sử chúng ta liên tục thấy nợ kỹ thuật được tạo ra trong một số khu vực cụ thể. Trong trường hợp đó, nó có thể chỉ ra rằng thiết kế của nhóm là sai và có thể có một nền tảng hoặc khả năng kinh doanh cần quyền sở hữu và sự chú ý mạnh mẽ.

Một số chỉ số **metrics** rất hữu ích — ví dụ: quét tìm các lỗi phổ biến hoặc đo thời gian xây dựng và triển khai. Tổ chức kỹ thuật nên cung cấp công cụ tự phục vụ để các nhóm có thể nhanh chóng tích hợp hệ thống của họ. Các số liệu nên được sử dụng làm chỉ dẫn để nhóm đưa ra quyết định về nợ công nghệ hơn là để người quản lý theo dõi hoặc khuyến khích. Các nhà phát triển có kinh nghiệm cung cấp giá trị bằng cách giải thích dữ liệu có sẵn và đưa ra ý kiến của họ dựa trên thông tin định tính dựa trên thực tế.

Mặc dù chúng tôi tin tưởng vào các nhóm tự chủ, nhưng quá nhiều quyền tự chủ có thể là một vấn đề và có thể dẫn đến bối cảnh kỹ thuật hỗn loạn. Cần có các biện pháp kiểm tra và cân bằng nhẹ, chẳng hạn như kiểm tra tự động hoặc đánh giá ngang hàng về kiến trúc, có thể giúp thực thi các chính sách và hỗ trợ các nhà phát triển.

Cách tổ chức của bạn chọn giải quyết khoản nợ công nghệ phụ thuộc vào bối cảnh của bạn. Một chủ đề phổ biến mà chúng tôi đã thấy ở nhiều tổ chức là mong muốn “chỉ cần làm một điều gì đó”, thường dẫn đến việc áp dụng một biện pháp tạm thời mà sau đó sẽ tạo ra những vấn đề riêng của nó. Thay vào đó, chúng tôi đã thấy rằng tiếp cận theo cách lặp lại và để các số liệu kết hợp với hoạt động phát triển hiện tại chỉ dẫn đầu tư vào việc giải quyết nợ kỹ thuật sẽ mang lại kết quả tốt hơn.

## Kết luận
- Việc có một ít nợ kỹ thuật hợp lý là cần thiết và lành mạnh cho các startup giai đoạn đầu.
- Tìm kiếm các dấu hiệu cảnh báo (như các giá trị theo thời gian hoặc sự hài lòng của kỹ sư) chỉ ra rằng nợ kỹ thuật sẽ hạn chế doanh nghiệp của bạn.
- Có một tiêu chuẩn chất lượng kỹ thuật rõ ràng và khiến các nhóm tuân thủ nó.
- Tạo quy trình xử lý nợ kỹ thuật, sự sở hữu rõ ràng và các nhóm có quyền truy cập thông tin minh bạch để đưa ra quyết định có căn cứ.
- Các cải tiến cần thiết cho nền tảng kỹ thuật có thể đang ẩn mình dưới hình dạng nợ kỹ thuật, đặc biệt nếu chúng có thể liên kết trực tiếp với KPIs.
- Tiếp tục đánh giá lại chiến lược nợ kỹ thuật của bạn, đặc biệt tại các thời điểm quan trọng trong hành trình phát triển của startup (vốn mới, hướng phát triển sản phẩm mới, nhân viên mới).

