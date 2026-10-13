# thegioinhiemkicuangan 🎀
Website cửa hàng thời trang pastel, xây dựng bằng HTML, CSS và JavaScript thuần.

## Chạy trên máy
1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt (Chrome/Edge).
3. Nếu trình duyệt hạn chế một số tính năng khi mở file trực tiếp, chạy server tĩnh:
   - Cài VS Code và extension **Live Server**, sau đó nhấn **Go Live**; hoặc
   - Có Python: chạy `python -m http.server 8000` trong thư mục rồi mở `http://localhost:8000`.

## Tính năng
- Responsive cho máy tính và điện thoại.
- Danh mục, tìm kiếm, sắp xếp sản phẩm.
- Giỏ hàng có tăng/giảm số lượng, lưu trong `localStorage`.
- Danh sách yêu thích lưu trong `localStorage`.
- Biểu mẫu đặt hàng demo và đăng ký nhận tin demo.
- Không cần cài framework hay API key.

## Đưa website lên GitHub Pages
1. Đăng nhập GitHub và tạo repository mới, ví dụ `thegioinhiemkicuangan`.
2. Tải lên `index.html`, `style.css`, `script.js`, `README.md` (đặt ở thư mục gốc repository).
3. Mở **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**; chọn branch `main`, folder `/(root)`, rồi **Save**.
5. Chờ GitHub Pages triển khai xong. Địa chỉ thường có dạng:
   `https://TEN-TAI-KHOAN.github.io/thegioinhiemkicuangan/`
   Thay `TEN-TAI-KHOAN` bằng username GitHub thực tế.

## Trước khi bán hàng thật
Đây là giao diện demo: sản phẩm/giá/hình ảnh chỉ để minh họa, đặt hàng không gửi về cửa hàng, email không được lưu, chưa có thanh toán hoặc quản lý tồn kho. Cần thay thông tin sản phẩm và hình ảnh bằng tài sản bạn có quyền sử dụng, thêm backend an toàn cho đơn hàng, chính sách giao hàng/đổi trả và thông tin liên hệ thật. Ảnh mẫu đang tải từ Unsplash nên cần internet.
