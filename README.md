# Farmer - Webgame Automation Framework

Hệ thống tự động hoá webgame (Sunflower Land và các webgame tương tự).
Điều khiển và cấu hình qua Web Dashboard. Thực thi bằng Playwright trên backend.

## 1. Kiến trúc hệ thống

- **Frontend (Web Dashboard):** Giao diện quản lý, theo dõi bot, và authoring cấu hình tự động hoá (no-code). Xây dựng với SvelteKit.
- **Backend (Core & Runtime):** Server Node.js điều khiển Playwright (chạy game) và thực thi logic automation.

## 2. Mô hình lõi (Core Framework)

Dựa trên đặc tả hệ thống cấu hình tự động hoá (`automation_framework.md`):

- **Registry:** Không gian tên trung tâm (flat map) lưu trữ các thực thể tái sử dụng (`string`, `argument`, `target`, `sensor`, `predicate`).
- **Thực thể (Types):**
  - `string`: Chuỗi thô/template có hỗ trợ placeholder.
  - `argument`: Tập lựa chọn phục vụ binding và tổ hợp compile.
  - `target`: Chuỗi locator (Playwright). Hỗ trợ compile tổ hợp (tối đa 32 branches).
  - `sensor`: Đọc dữ liệu UI (trả về số/chuỗi). Gồm: `count`, `text`, `attr`, `value`.
  - `predicate`: Đánh giá điều kiện logic (trả về boolean).
- **Tính năng cốt lõi:**
  - Hỗ trợ biến/thực thể dạng `inline` (dùng 1 lần) và `named` (tái sử dụng trong Registry).
  - Phân tích chu kỳ (Cycle detection) & Resolve sớm để phát hiện lỗi.
  - Tách biệt rõ ràng giữa việc thu thập dữ liệu (`sensor`) và đánh giá logic (`predicate`).

## 3. Lộ trình phát triển (Roadmap)

1. **Giai đoạn 1: Core Engine**
   - Cài đặt Registry & Validation.
   - Implement các type cơ bản: `string`, `argument`, `target` (kèm full compile resolver).
2. **Giai đoạn 2: Sensor & Predicate**
   - Implement logic đọc dữ liệu qua Playwright (`sensor`).
   - Cài đặt hệ thống so sánh & logic (`predicate`).
3. **Giai đoạn 3: Runtime & UI**
   - Xây dựng Web Dashboard với SvelteKit.
   - Hoàn thiện UI Authoring (tạo action, task, plan theo mô hình no-code).
   - Tích hợp Engine vào luồng chạy thực tế của bot.

## 4. Phát triển

SvelteKit project đã được khởi tạo. Cài đặt dependencies:

```sh
npm install
```

Chạy dev server:

```sh
npm run dev
```
