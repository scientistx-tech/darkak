import React, { useEffect, useRef, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  useCreateSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useUploadFormDataMutation,
} from '@/redux/services/admin/adminCategoryApis';
import { toast } from 'react-toastify';
import SelectField from '@/app/(root)/user/profile/components/SelectField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaqType } from '../sub-categories/AddSubCategories';
import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
import Image from 'next/image';
import Textarea from '../../components/Textarea';
import EditorHTML from '@/components/EditorHTML';

type AddDataProps = {
  refetch: () => void;
  categories: {
    id: number;
    title: string;
    icon: string;
    serial: number;
    isActive: true;
    _count:
      | {
          products: number;
        }[]
      | undefined;
  }[];

  subCategories: {
    id: number;
    title: string;
    categoryId: number;
    _count:
      | {
          products: number;
        }[]
      | undefined;
    category: {
      id: number;
      title: string;
      icon: string;
      serial: number;
      isActive: boolean;
      _count:
        | {
            products: number;
          }[]
        | undefined;
    };
  }[];
  value?: {
    id: string;
    title: string;
    categoryId: string;
    subCategoryId: string;
    meta_keywords: {
      keywords: string;
    };
    meta_title: string;
    content: string;
    meta_description: string;
    faq: FaqType;
    meta_alt: string;
    meta_image: string;
  };
  setIsEditable?: (arg: {
    status: boolean;
    value: {
      id: string;
      title: string;
      categoryId: string;
      subCategoryId: string;
      meta_keywords: {
        keywords: string;
      };
      meta_title: string;
      content: string;
      meta_description: string;
      faq: FaqType;
      meta_alt: string;
      meta_image: string;
    };
  }) => void;
};

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required('Sub Category Name is required'),
  categoryId: yup.string().required('Main Category is required'),
  subCategoryId: yup.string().required('Sub Category is required'),
});

function AddSubSubCategories({
  refetch,
  categories,
  subCategories,
  value,
  setIsEditable,
}: AddDataProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [uploadFormData, { isLoading }] = useCreateSubSubCategoryMutation();
  const [updateSubSubCategory, { isLoading: loadingUpdate }] = useUpdateSubSubCategoryMutation();
  const [meta_image, setMetaImage] = useState<File | null>(null);
  const [meta_title, setMetaTitle] = useState(value?.meta_title || '');
  const [meta_keywords, setMetaKeywords] = useState(value?.meta_keywords || '');
  const [meta_description, setMetaDescription] = useState(value?.meta_description || '');
  const [meta_alt, setMetaAlt] = useState(value?.meta_alt || '');
  const [content, setContent] = useState(value?.content || '');
  const [metaImagePreview, setMetaImagePreview] = useState<string | null>(
    value?.meta_image || null
  );
  const specificationEditor = useRef<any>(null);
  const [uploadImages] = useUploadImagesMutation();

  const [faqList, setFaqList] = useState<any>(
    value?.faq?.faq || [
      { question: '', answer: '' },
      { question: '', answer: '' },
    ]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: value?.title || '',
      categoryId: value?.categoryId || '',
      subCategoryId: value?.subCategoryId || '',
    },
  });

  useEffect(() => {
    if (value) {
      reset({
        title: value.title || '',
        categoryId: value.categoryId || '',
        subCategoryId: value?.subCategoryId || '',
      });
      setMetaAlt(value.meta_alt || '');
      setMetaTitle(value.meta_title || '');
      setMetaKeywords(
        Array.isArray(value.meta_keywords?.keywords)
          ? value.meta_keywords.keywords.join(', ')
          : value.meta_keywords?.keywords || ''
      );
      setMetaDescription(value.meta_description || '');
      setContent(value.content || '');
      setMetaImagePreview(value.meta_image || null);
      setFaqList(
        Array.isArray(value.faq?.faq)
          ? value.faq.faq.map((f: any) => ({
              question: f.question || '',
              answer: f.answer || '',
            }))
          : [
              { question: '', answer: '' },
              { question: '', answer: '' },
            ]
      );
    }
  }, [value, reset]);

  const selectedCategoryId = watch('categoryId');
  const filteredSubCategories = subCategories.filter(
    (sCat: any) => Number(sCat?.categoryId) === Number(selectedCategoryId)
  );

  //console.log('selected cat', selectedCategoryId);
  //console.log('filtered sub cat', filteredSubCategories);
  const handleFaqChange = (index: number, field: keyof FaqType['faq'][number], val: string) => {
    const updated = [...faqList];
    updated[index][field] = val;
    setFaqList(updated);
  };

  const handleAddFaq = () => {
    setFaqList([...faqList, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqList((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  }

  const onSubmit = async (data: any) => {
    const faqPayload = {
      faq: faqList?.map((f: any) => ({
        question: f.question,
        answer: f.answer,
      })),
    };

    const keywordsPayload = {
      keywords: (typeof meta_keywords === 'string' ? meta_keywords : meta_keywords?.keywords || '')
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
    };
    let metaImageUrl = undefined;
    if (meta_image) {
      const metaImage = await urlToFile(
        metaImagePreview || '',
        `meta-img-${Date.now()}.png`,
        'image/png'
      );
      if (!metaImage) {
        toast.error('meta Image needed for Slider');
        return;
      }
      const imgForm = new FormData();
      imgForm.append('images', metaImage);
      const imgs = await uploadImages(imgForm).unwrap();
      metaImageUrl = imgs[0];
    }
    const formData = {
      title: data?.title,
      categoryId: parseInt(data?.categoryId),
      subCategoryId: parseInt(data?.subCategoryId),
      meta_keywords: keywordsPayload,
      meta_title,
      content,
      meta_description,
      faq: faqPayload,
      meta_alt,
      meta_image: metaImageUrl || metaImagePreview,
    };
    try {
      if (value && value?.id) {
        await updateSubSubCategory({
          subSubCategoryId: value?.id,
          formData,
        }).unwrap();
        toast.success('Sub Sub Category Updated successfully!');
        if (setIsEditable) {
          setIsEditable({
            status: false,
            value: {
              id: '',
              title: '',
              categoryId: '',
              subCategoryId: '',
              meta_keywords: { keywords: '' },
              meta_title: '',
              content: '',
              meta_description: '',
              faq: { faq: [] },
              meta_alt: '',
              meta_image: '',
            },
          });
        }
      } else {
        const res = await uploadFormData(formData).unwrap();
        toast.success(res.message || 'Sub Sub Category created successfully!');
      }
      refetch();
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create category.');
      console.error('Error uploading:', error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xl font-semibold">Add Sub Sub Category</div>

      {/* language tabs */}
      {/* <div className="my-5 flex items-center gap-x-5">
        <div
          className={`${currentLanguage === "en" ? "border-b-2 border-blue-500 text-blue-500" : ""} flex cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("en")}
        >
          <button>English (EN)</button>
        </div>
        <div
          className={`${currentLanguage === "bn" ? "border-b-2 border-blue-500 text-blue-500" : ""} cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage("bn")}
        >
          <button>Bengali (BD)</button>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <Input
            placeholder={`Sub sub category name (${currentLanguage === 'en' ? 'EN' : 'BD'})`}
            {...register('title')}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={[
                  { label: 'Select main category', value: '' },
                  ...(categories?.map((category: any) => ({
                    label: category.title,
                    value: category.id.toString(), // Ensure value is a string
                  })) || []),
                ]}
                onChange={(value: string) => {
                  field.onChange(value); // Update the value in the form
                }}
                value={field.value}
              />
            )}
          />
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="subCategoryId"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={[
                  { label: 'Select sub category', value: '' },
                  ...(filteredSubCategories?.map((subCategory: any) => ({
                    label: subCategory.title,
                    value: subCategory.id.toString(), // Ensure value is a string
                  })) || []),
                ]}
                onChange={(value: string) => {
                  field.onChange(value); // Update the value in the form
                }}
                value={field.value}
              />
            )}
          />
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Meta Title"
          value={meta_title}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
        <Input
          placeholder="Meta Keywords"
          value={typeof meta_keywords === 'string' ? meta_keywords : meta_keywords?.keywords || ''}
          onChange={(e) => setMetaKeywords(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Textarea
          placeholder="Meta Description"
          value={meta_description}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
      </div>
      <EditorHTML
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Meta Alt Input */}
        <Input
          placeholder="Meta Alt"
          value={meta_alt}
          onChange={(e) => setMetaAlt(e.target.value)}
        />

        {/* Meta Image Drag & Drop Upload */}
        <div className="mt-1">
          <label className="mb-1 block text-sm font-medium">Meta Image</label>
          <div
            className="w-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setMetaImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setMetaImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            <label
              htmlFor="meta-file-upload"
              className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50"
            >
              {metaImagePreview ? (
                <div className="relative h-full w-full">
                  <Image
                    src={metaImagePreview}
                    alt="Meta Preview"
                    className="h-full w-full rounded-lg object-contain py-3"
                    width={150}
                    height={150}
                    
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMetaImage(null);
                      setMetaImagePreview(null);
                    }}
                    className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    width={30}
                    height={30}
                    src="/images/icon/icon-image.png"
                    alt="image-icon"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop an image, or <span className="text-blue-500">Upload</span>
                  </p>
                </div>
              )}
              <input
                id="meta-file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMetaImage(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setMetaImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {faqList?.map((faq: any, index: any) => (
          <React.Fragment key={index}>
            {/* FAQ Question Input */}
            <Input
              className="w-full"
              placeholder={`FAQ Question ${index + 1}`}
              value={faq.question}
              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
            />

            {/* FAQ Answer Input + Remove Button */}
            <div className="flex items-center gap-2">
              <Input
                className="w-full"
                placeholder={`FAQ Answer ${index + 1}`}
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
              />
              <Button
                type="button"
                onClick={() => handleRemoveFaq(index)}
                className="shrink-0 bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                ✕
              </Button>
            </div>
          </React.Fragment>
        ))}

        {/* Add FAQ Button */}
        <div className="col-span-2 flex w-full justify-end">
          <Button type="button" onClick={handleAddFaq} className="bg-blue-500 text-white">
            Add More FAQ
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {value?.id && (
          <Button
            onClick={() => {
              if (setIsEditable) {
                setIsEditable({
                  status: false,
                  value: {
                    id: '',
                    title: '',
                    categoryId: '',
                    subCategoryId: '',
                    meta_keywords: { keywords: '' },
                    meta_title: '',
                    content: '',
                    meta_description: '',
                    faq: { faq: [] },
                    meta_alt: '',
                    meta_image: '',
                  },
                });
              }
            }}
            className="bg-red-500"
          >
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}

export default AddSubSubCategories;
