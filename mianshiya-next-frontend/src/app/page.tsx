import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import "./index.css";

// 本页面使用服务端渲染，禁用静态生成
export const dynamic = "force-dynamic";

/**
 * 主页（服务端组件）
 */
export default async function HomePage() {
  let questionBankList: any[] = [];
  let questionList: any[] = [];

  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data?.records ?? [];
  } catch (error) {
    // 服务端组件中不直接使用 antd 的 message，避免在服务端执行副作用
    console.error("获取题库列表失败", error);
  }

  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data?.records ?? [];
  } catch (error) {
    console.error("获取题目列表失败", error);
  }

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href="/banks">查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link href="/questions">查看更多</Link>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
