package com.yupi.mianshiya.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.mianshiya.model.dto.question.QuestionQueryRequest;
import com.yupi.mianshiya.model.entity.Question;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.QuestionVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 题目服务
 *
 * 负责题目的核心业务处理，如数据校验、查询组装、ES 搜索、封装 VO 对象、批量操作等，
 * Controller 层只做参数校验和结果包装，具体业务都在该接口的实现类中沉淀。
 */
public interface QuestionService extends IService<Question> {

    /**
     * 校验数据
     *
     * @param question
     * @param add      对创建的数据进行校验
     */
    void validQuestion(Question question, boolean add);

    /**
     * 获取查询条件
     *
     * @param questionQueryRequest
     * @return
     */
    QueryWrapper<Question> getQueryWrapper(QuestionQueryRequest questionQueryRequest);

    /**
     * 获取题目封装
     *
     * @param question
     * @param request
     * @return
     */
    QuestionVO getQuestionVO(Question question, HttpServletRequest request);

    /**
     * 分页获取题目封装
     *
     * @param questionPage
     * @param request
     * @return
     */
    Page<QuestionVO> getQuestionVOPage(Page<Question> questionPage, HttpServletRequest request);

    /**
     * 分页获取题目列表
     *
     * @param questionQueryRequest
     * @return
     */
    Page<Question> listQuestionByPage(QuestionQueryRequest questionQueryRequest);

    /**
     * 从 ES 查询题目
     *
     * @param questionQueryRequest
     * @return
     */
    Page<Question> searchFromEs(QuestionQueryRequest questionQueryRequest);

    /**
     * 批量删除题目
     *
     * @param questionIdList
     */

    void batchDeleteQuestions(List<Long> questionIdList);

    /**
     * AI 生成题目
     * @param questionType 题目类型，比如 Java
     * @param number 题目数量，比如 10
     * @param user 创建人
     * @return ture / false
     */
    boolean aiGenerateQuestions(String questionType, int number, User user);
}
