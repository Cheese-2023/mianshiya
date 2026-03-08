"use server";
import Title from "antd/es/typography/Title";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";
import "./index.css";

/**
 * 题目列表页面（服务端渲染）
 *
 * 根据搜索参数从后端拉取题目列表，并将初始数据透传给客户端表格组件，支持后续在浏览器端翻页和筛选。
 */
export default async function QuestionsPage({ searchParams }: { searchParams: { q?: string } }) {
  // 从 URL 查询参数中解析搜索关键字
  const { q: searchText } = searchParams || {};

  // 题目列表和总数
  let questionList: API.QuestionVO[] = [];
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data?.records ?? [];
    total = Number(res.data?.total ?? 0);
  } catch (error) {
    // 服务端环境不使用 antd 的 message，避免副作用；仅记录日志
    console.error("获取题目列表失败", error);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
