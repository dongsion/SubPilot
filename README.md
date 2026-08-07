# SubPilot · 订阅管家

一款精致的订阅管理 + 个人记账 PWA 应用。黑金配色，移动端优先，支持本地存储和云端同步。

## 功能

- **订阅管理**：追踪所有订阅服务，支持周/月/季/年计费周期，自动识别品牌，环形进度条三色显示（绿/金/红）
- **自动扣款**：订阅到期自动从关联账户扣款，生成流水记录
- **账户管理**：银行卡/支付宝/微信/云闪付/理财通/余额宝/自定义钱包，层叠卡片设计，右滑切换
- **AI记账**：一句话自然语言记账，自动识别金额、分类、账户
- **记账流水**：收入/支出双模式，8个支出分类，按日期分组
- **报表分析**：月度/年度收支趋势折线图、支出分类饼图、同比环比
- **汇率换算**：支持USD/EUR/GBP/JPY/HKD/TWD自动换算人民币
- **二维码夹**：分类管理常用二维码（收款/交通/医疗/个人）
- **发票夹**：手动上传发票图片/PDF，分类管理
- **到期提醒**：浏览器通知，到期前3天/1天/当天推送
- **震动反馈**：所有按钮和操作都有触觉反馈
- **PWA支持**：可添加到主屏幕，离线可用，桌面快捷方式，应用角标
- **数据备份**：JSON格式导出/导入
- **☁️ 云同步**：基于Supabase，邮箱验证码登录，多设备数据同步

## 技术栈

- 纯原生 HTML/CSS/JavaScript
- LocalStorage 本地数据持久化
- Supabase 云端同步（可选配置）
- Service Worker 离线缓存
- PWA Manifest + Shortcuts + Badging API
- Web Vibration API 触觉反馈
- Notification API 到期提醒

## 本地开发

```bash
cd docs
python3 -m http.server 8080
```

浏览器访问 `http://localhost:8080`

## 部署

推送到 GitHub 后在仓库 Settings → Pages 中选择 `main` 分支 `/docs` 目录即可自动部署。

## 云同步部署（可选）

SubPilot 默认纯本地运行。如需跨设备云同步，需要自行搭建 Supabase 项目（免费额度足够个人使用）。

### 步骤

1. **注册 Supabase**：前往 [supabase.com](https://supabase.com) 注册账号，创建新项目（免费）

2. **执行 SQL 建表**：打开 Supabase 项目 → SQL Editor，将 [`supabase-schema.sql`](./supabase-schema.sql) 中的 SQL 粘贴执行：
   - 创建 `user_data` 表存储各数据类型
   - 开启行级安全（RLS），用户只能访问自己的数据
   - 创建自动更新时间戳触发器

3. **配置邮箱认证**：Authentication → Providers → Email
   - 确认 "Enable Email provider" 已开启
   - 如需自定义发件邮箱，配置 SMTP（可选）

4. **获取项目密钥**：Settings → API
   - 复制 `Project URL`（如 `https://xxxx.supabase.co`）
   - 复制 `anon public` key（以 `eyJhbGciOi...` 开头）

5. **在 App 中配置**：打开 SubPilot → 设置 → 云服务配置，填入 URL 和 Key，保存

6. **登录同步**：设置 → 云端同步 → 输入邮箱 → 查收验证码 → 输入验证码登录，数据自动同步

### 同步机制

- 使用 Last-Write-Wins 策略：本地和云端按时间戳比较，较新的覆盖较旧的
- 首次登录自动全量同步
- 启动时自动同步（如已登录）
- 登录后点击账号可手动同步

## 关于邮箱自动收发票

受限于浏览器安全模型，纯前端 PWA 无法在后台持续监控邮箱。未来方案：
- 方案A：接入 Gmail/Outlook OAuth，用户授权后通过 Supabase Edge Function 定时拉取
- 方案B：提供专用转发邮箱，设置邮件自动转发即可

## 版本

当前版本：v1.7.4
