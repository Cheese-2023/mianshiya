# 面试鸭刷题平台

基于 **Next.js 服务端渲染 + Spring Boot + Redis + MySQL + Elasticsearch** 的在线面试刷题平台，支持题库管理、题目检索、在线刷题和刷题记录等功能，适合作为练手项目或实际业务项目基础框架。

线上示例可参考：`https://mianshiya.com`


## 功能介绍

- **题库管理**
  - 管理员创建 / 编辑 / 删除题库
  - 批量关联题目到题库
- **题目管理**
  - 题目增删改查、标签管理
  - 管理题解与解析
- **在线刷题**
  - 用户注册登录
  - 按关键词 / 标签搜索题目
  - 在线答题与查看题解
- **刷题记录**
  - 记录用户刷题行为
  - 刷题日历可视化（进阶功能）
- **系统与安全**
  - 基于权限的接口访问控制
  - 缓存、限流、热 key 探测（进阶阶段）


## 技术栈

### 后端

- Java Spring Boot（多模块 Maven 构建）
- Spring MVC
- MyBatis + MyBatis-Plus（分页、代码生成）
- MySQL
- Redis 分布式缓存 + Caffeine 本地缓存
- Redisson 分布式锁 + BitMap + BloomFilter
- Elasticsearch 搜索引擎
- Druid 数据库连接池
- Sa-Token 权限控制
- HotKey 热点探测
- Sentinel 流量控制
- Nacos 配置中心

### 前端

- React 18
- Next.js 服务端渲染
- Redux 状态管理
- Ant Design 组件库
- 富文本编辑器
- ESLint + Prettier + TypeScript
- OpenAPI 前端代码生成


## 目录结构

```bash
.
├── mianshiya-next-frontend   # 前端 Next.js 项目
├── mianshiya-next-backend    # 后端 Spring Boot 项目
└── README.md                 # 项目说明（当前文件）
```


## 环境要求

- Node.js 18+、npm / pnpm / yarn 其一
- JDK 17+（具体版本可参考后端模块的 `pom.xml`）
- MySQL 数据库
- Redis
- （可选）Elasticsearch、Nacos、Sentinel 等组件，用于进阶功能


## 本地运行

### 1. 启动后端（Spring Boot）

1）进入后端目录：

```bash
cd mianshiya-next-backend
```

2）根据本地环境修改配置文件 `src/main/resources/application.yml` 中的：

- **数据库配置**（`spring.datasource`）
- **Redis 配置**（`spring.redis`）
- （如需）**Elasticsearch / Nacos / Sentinel 等配置**

3）启动后端服务：

```bash
mvn spring-boot:run
```

4）默认情况下，可通过类似地址访问后端接口 / 文档（以实际配置为准，例如）：

- 接口文档：`http://localhost:8101/api/doc.html`


### 2. 启动前端（Next.js）

1）进入前端目录：

```bash
cd mianshiya-next-frontend
```

2）安装依赖：

```bash
npm install
# 或
pnpm install
# 或
yarn
```

3）启动开发环境：

```bash
npm run dev
```

4）在浏览器打开：

- `http://localhost:3000`

确保前端请求的后端接口地址（环境变量 / 配置文件）与本地后端实际启动地址一致。


## 生产部署（示例流程）

### 后端

1）在 `mianshiya-next-backend` 中打包：

```bash
mvn clean package -DskipTests
```

2）将生成的 `jar` 部署到服务器，配置正确的环境变量和 `application-*.yml`：

```bash
java -jar target/mianshiya-*.jar
```

3）通过反向代理（如 Nginx）暴露对外 HTTP 端口，并配置 HTTPS 等。


### 前端

1）在 `mianshiya-next-frontend` 中构建生产包：

```bash
npm run build
npm run start   # 使用 Node.js 启动 Next.js 生产服务
```

2）同样可通过 Nginx / 负载均衡将前端服务对外暴露，或根据需求部署到支持 Next.js 的平台（如 Vercel 等）。


## 开发阶段大纲（可选参考）

项目可拆分为多个阶段逐步实现和优化，例如：

1. **基础刷题平台**
   - 完成基础题库 / 题目 / 用户模块
   - 实现基础的搜索和刷题流程
2. **进阶功能扩展**
   - 刷题记录日历、题目分词搜索
   - 引入 Redis 缓存、Elasticsearch 搜索、Druid 连接池、热 key 探测等
3. **企业级优化与上线**
   - Sentinel 限流与熔断
   - Nacos 动态配置与 IP 黑白名单
   - Sa-Token 权限与登录冲突检测
   - 分级反爬虫、监控与日志等

你可以根据实际业务需求裁剪和选择需要的模块。


## 贡献

欢迎通过 Issue / Pull Request 提交：

- Bug 反馈
- 新功能建议
- 文档完善
- 性能与架构优化建议

在提交代码前，请尽量保证：

- 通过现有单元测试
- 遵守现有代码风格（ESLint / Checkstyle 等）


## 许可证

根据仓库实际情况选择合适的开源协议（例如 MIT、Apache-2.0 等），并在仓库中添加对应的 `LICENSE` 文件。

