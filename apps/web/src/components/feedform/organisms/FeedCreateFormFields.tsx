'use client';
import React, { useState } from 'react';
import { feedFormSchema } from '@/schema/FeedFormSchema';
import { Private, Public } from '@/components/common/icons';
import type { CreateFeedType, FeedHashtag } from '@/types/request/requestType';
import ImageUploader from '../molecule/ImageUploader';

function FeedCreateFormFields({
  payload,
  setPayload,
}: {
  payload: CreateFeedType;
  setPayload: React.Dispatch<React.SetStateAction<CreateFeedType>>;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    let updatedValue: unknown;

    if (name === 'tags') {
      // 태그 처리
      updatedValue = value.split(',').map((tag) => ({
        name: tag.trim(),
      })); // FeedHashtag[] 변환
      setPayload((prev) => ({
        ...prev,
        hashtags: updatedValue as FeedHashtag[],
      }));
    } else if (name === 'categoryName') {
      updatedValue = value;
      setPayload((prev) => ({ ...prev, categoryName: updatedValue as string }));
    } else if (name === 'status') {
      updatedValue = value === 'public' ? 'VISIBLE' : 'HIDDEN';
      setPayload((prev) => ({
        ...prev,
        visibility: updatedValue as 'VISIBLE' | 'HIDDEN',
      }));
    } else {
      updatedValue = value;
      setPayload((prev) => ({ ...prev, [name]: updatedValue }));
    }

    const validatedPayload = {
      ...payload,
      [name]: updatedValue,
    };

    const res = feedFormSchema.safeParse(validatedPayload); // 스키마 검증

    if (!res.success) {
      const validationErrors = res.error.issues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }),
        {}
      );
      setErrors(validationErrors); // 에러 메시지 저장
    } else {
      setErrors({}); // 에러 초기화
    }
  };

  return (
    <fieldset className="flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="block text-sm font-bold">
          제목
        </label>
        <input
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleChange}
          className="w-full h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
        />
        {errors.title ? <p style={{ color: 'red' }}>{errors.title}</p> : null}
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="post" className="block text-sm font-bold">
          내용
        </label>
        <textarea
          id="post"
          name="content"
          className="w-full h-[116px] border-2 outline-none rounded-lg bg-[#F1F4F9] p-2 focus:bg-[#D4D4D4]"
          rows={4}
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        />
        {errors.content ? (
          <p style={{ color: 'red' }}>{errors.content}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="categoryName" className="block text-sm font-bold">
          Category
        </label>
        <select
          id="categoryName"
          name="categoryName"
          className="block w-full px-3 py-3 bg-[#F1F4F9] border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4D4D4] focus:border-transparent"
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="관상어">관상어</option>
          <option value="장터">장터</option>
          <option value="양육일기">양육일기</option>
        </select>
        {errors.categoryName ? (
          <p style={{ color: 'red' }}>{errors.categoryName}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="tags" className="block text-sm font-bold">
          태그
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="w-full h-[55px] rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4] outline-none"
          placeholder="태그 (쉼표로 구분)"
          onChange={handleChange}
        />
        {errors.tags ? <p style={{ color: 'red' }}>{errors.tags}</p> : null}
      </div>

      <div className="flex gap-6">
        <label id="public" className="flex items-center space-x-2">
          <input
            type="radio"
            name="status"
            value="public"
            className="h-4 w-4 border-gray-300 "
            onChange={handleChange}
          />
          <Public width={27} height={27} />
          <div className="flex flex-col gap-1">
            <span className="text-[1rem] font-medium">VISIBLE</span>
            <span className="text-[0.8rem] text-gray-500">
              모두가 피드를 볼 수 있어요.
            </span>
          </div>
        </label>

        <label id="hidden" className="flex items-center space-x-2">
          <input
            type="radio"
            name="status"
            value="hidden"
            className="h-4 w-4 border-gray-300 "
            onChange={handleChange}
          />
          <Private width={27} height={27} />
          <div className="flex flex-col gap-1">
            <span className="text-[1rem] font-medium">HIDDEN</span>
            <span className="text-[0.8rem] text-gray-500">
              나만 피드를 볼 수 있어요.
            </span>
          </div>
        </label>
      </div>

      <ImageUploader setPayload={setPayload} />
    </fieldset>
  );
}

export default FeedCreateFormFields;
