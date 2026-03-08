"use server";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";

/**
 * 题库列表页面（服务端渲染）
 *
 * 由于题库数量相对较少，这里采用一次性拉取全部题库的方式展示，避免在前端做过多分页逻辑。
 */
export default async function BanksPage() {
  let questionBankList: API.QuestionBankVO[] = [];
  // 题库数量不多，直接全量获取
  const pageSize = 200;

  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data?.records ?? [];
  } catch (error) {
    console.error("获取题库列表失败", error);
  }

  return (
    <div id="banksPage" className="max-width-content">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
