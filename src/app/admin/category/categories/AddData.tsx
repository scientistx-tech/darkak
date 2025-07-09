import React, { useRef, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  useUpdateCategoryMutation,
  useUploadFormDataMutation,
} from '@/redux/services/admin/adminCategoryApis';
import { toast } from 'react-toastify';
import SelectField from '@/app/(root)/user/profile/components/SelectField';
import Image from 'next/image';
import Textarea from '../../components/Textarea';
import JoditEditor from 'jodit-react';
import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
import { values } from '@remirror/core';

export type FaqType = {
  question: string;
  answer: string;
};
type AddDataProps = {
  refetch: () => void;
  value?: {
    id: string;
    title: string;
    icon: string;
    serial: string;
    meta_keywords: string;
    meta_title: string;
    content: string;
    meta_description: string;
    faq: FaqType[];
    meta_alt: string;
    meta_image: string;
  };
  setIsEditable?: (arg: {
    status: boolean;
    value: {
      id: string;
      title: string;
      icon: string;
      serial: string;
      meta_keywords: string;
      meta_title: string;
      content: string;
      meta_description: string;
      faq: FaqType[];
      meta_alt: string;
      meta_image: string;
    };
  }) => void;
};

function AddData({ refetch, value, setIsEditable }: AddDataProps) {
  const [title, setTitle] = useState(value?.title || '');
  const [meta_title, setMeta_title] = useState(value?.meta_title || '');
  const [meta_keywords, setMeta_keywords] = useState(value?.meta_keywords || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedCategoryPriority, setSelectedCategoryPriority] = useState(
    value?.serial || 'Select Priority'
  );
  const [meta_alt, setMetaAlt] = useState(value?.meta_alt || '');
  const [meta_description, setMetaDescription] = useState(value?.meta_description || '');
  const [meta_image, setMetaImage] = useState<File | null>(null);
  const [metaImagePreview, setMetaImagePreview] = useState<string | null>(null);
  const [faqList, setFaqList] = useState<FaqType[]>(value?.faq || [{ question: '', answer: '' }]);
  const [content, setContent] = useState(value?.content || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const specificationEditor = useRef<any>(null);

  const [uploadFormData, { isLoading }] = useUploadFormDataMutation();
  const [updateCategory, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();
  const [uploadImages] = useUploadImagesMutation();

  React.useEffect(() => {
    if (value?.title !== undefined && value?.serial !== undefined) {
      setTitle(value?.title);
      setSelectedCategoryPriority(value.serial);
      setPreviewImage(value?.icon);
      setFaqList(value?.faq);
      setMetaImagePreview(value?.meta_image);
      setMetaAlt(value?.meta_alt);
      setMetaDescription(value?.meta_description);
      setMeta_title(value?.meta_title);
      setMeta_keywords(value?.meta_keywords);
      setContent(value?.content);
    }
  }, [value]);

  const getValidationClass = (value: string, min: number, max: number) => {
    if (value.length < min || value.length > max) {
      return 'text-red-500';
    }
    return 'text-green-600';
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  }

  const handleSubmit = async () => {
    if (!title) {
      toast.error('Please provide both title and image.');
      return;
    }

    const faqPayload = {
      faq: faqList.map((f) => ({
        question: f.question,
        answer: f.answer,
      })),
    };

    const keywordsPayload = {
      keywords: meta_keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('serial', selectedCategoryPriority);
    formData.append('meta_title', meta_title);
    formData.append('meta_keywords', JSON.stringify(keywordsPayload));
    formData.append('meta_alt', meta_alt);
    formData.append('meta_description', meta_description);
    formData.append('content', content);
    formData.append('faq', JSON.stringify(faqPayload));

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
      formData.append('meta_image', imgs[0]);
    }

    if (imageFile) {
      const image = await urlToFile(previewImage || '', `image-${Date.now()}.png`, 'image/png');
      if (!image) {
        toast.error('Image needed for Slider');
        return;
      }
      formData.append('icon', image as File);
    }

    //console.log('formData', formData);

    try {
      if (value && value?.id) {
        const res = await updateCategory({
          categoryId: value?.id,
          formData,
        }).unwrap();
        toast.success(res?.message || 'Category Updated Successfully');
        if (setIsEditable) {
          setIsEditable({
            status: false,
            value: {
              id: '',
              title: '',
              icon: '',
              serial: '',
              meta_keywords: '',
              meta_title: '',
              content: '',
              meta_description: '',
              faq: [{ question: '', answer: '' }],
              meta_alt: '',
              meta_image: '',
            },
          });
        }
      } else {
        await uploadFormData(formData).unwrap();
        toast.success('Category created successfully!');
        setTitle('');
        setSelectedCategoryPriority('');
        setImageFile(null);
        setPreviewImage(null);
        setMetaImage(null);
        setMetaImagePreview(null);
        setMetaAlt('');
        setMetaDescription('');
        setMeta_title('');
        setMeta_keywords('');
        setContent('');
        setFaqList([{ question: '', answer: '' }]);
      }
      refetch();
      setTitle('');
      setSelectedCategoryPriority('Select Priority');
      setImageFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Failed to create category.');
    }
  };

  const handlePriorityChange = (value: string) => {
    setSelectedCategoryPriority(value);
  };

  const handleAddFaq = () => {
    setFaqList([...faqList, { question: '', answer: '' }]);
  };

  const handleFaqChange = (index: number, field: keyof FaqType, value: string) => {
    const updatedFaqs = [...faqList];
    updatedFaqs[index][field] = value;
    setFaqList(updatedFaqs);
  };
  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = [...faqList];
    updatedFaqs.splice(index, 1);
    setFaqList(updatedFaqs);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <span className="text-yellow-600">📋</span> {value?.id ? 'Edit Category' : 'Category Setup'}
      </h1>

      {/* language tabs */}
      {/* <div className="my-5 flex items-center gap-x-5">
        <div
          className={`${currentLanguage === 'en' ? 'border-b-2 border-blue-500 text-blue-500' : ''} flex cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage('en')}
        >
          <button>English (EN)</button>
        </div>
        <div
          className={`${currentLanguage === 'bn' ? 'border-b-2 border-blue-500 text-blue-500' : ''} cursor-pointer py-2 text-sm font-medium tracking-wider`}
          onClick={() => setCurrentLanguage('bn')}
        >
          <button>Bengali (BD)</button>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder={`Category Name (${currentLanguage === 'en' ? 'EN' : 'BD'})`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <SelectField
          // label="Marital Status"
          value={selectedCategoryPriority}
          onChange={(value: string) => handlePriorityChange(value)}
          options={[
            { label: 'Set Priority', value: '' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
          ]}
        />
      </div>
      <div
        className="mt-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        <label
          htmlFor="file-upload"
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50"
        >
          {previewImage ? (
            <div className="relative h-full w-full">
              <Image
                src={previewImage}
                alt="Preview"
                className="h-full w-full rounded-lg object-contain py-3"
                width={150}
                height={150}
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setPreviewImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image width={30} height={30} src="/images/icon/icon-image.png" alt="image-icon" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop an image, or <span className="text-blue-500">Upload</span>
              </p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </label>
      </div>
      {/* meta section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Input
            placeholder="Meta Title (50–60 words)"
            value={meta_title}
            maxLength={60}
            onChange={(e) => setMeta_title(e.target.value)}
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Meta Title should be between 50-60 characters.
            </span>
            <span className={`text-xs font-semibold ${getValidationClass(meta_title, 50, 60)}`}>
              {meta_title.length} chars
            </span>
          </div>
        </div>

        <Input
          placeholder="Meta Keywords (e.g., fashion, summer)"
          value={meta_keywords}
          onChange={(e) => setMeta_keywords(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Textarea
            placeholder="Meta Description"
            value={meta_description}
            maxLength={160}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Content should be between 150-160 characters.
            </span>
            <span
              className={`text-xs font-semibold ${getValidationClass(meta_description, 150, 160)}`}
            >
              {meta_description.length} chars
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <JoditEditor
            ref={specificationEditor}
            config={{
              askBeforePasteHTML: false,
              defaultActionOnPaste: 'insert_only_text',
              uploader: {
                insertImageAsBase64URI: true,
              },
              placeholder: 'Start writing specification',
              height: '250px',
              toolbar: true,
            }}
            value={content}
            onBlur={(newContent) => {
              setContent(newContent);
            }}
          />
          {/* <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Content should be between 200-250 characters.
            </span>
            <span className={`text-xs font-semibold ${getValidationClass(content, 200, 250)}`}>
              {content.length} chars
            </span>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Meta Alt"
          value={meta_alt}
          onChange={(e) => setMetaAlt(e.target.value)}
        />
      </div>
      {/* faq section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {faqList.map((faq, index) => (
          <div key={index} className="col-span-2 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {/* Question Input */}
            <div className="flex w-full items-center gap-2">
              <Input
                className="w-full"
                placeholder={`FAQ Question ${index + 1}`}
                value={faq.question}
                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
              />
            </div>

            {/* Answer Input */}
            <div className="flex w-full items-center gap-2">
              <Input
                className="w-full"
                placeholder={`FAQ Answer ${index + 1}`}
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
              />
              <button
                type="button"
                className="shrink-0 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                onClick={() => handleRemoveFaq(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <div className="col-span-2">
          <Button type="button" onClick={handleAddFaq} className="bg-blue-500 text-white">
            Add More FAQ
          </Button>
        </div>
      </div>

      <div className="mt-4">
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
                <Image width={30} height={30} src="/images/icon/icon-image.png" alt="image-icon" />
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

      {/* submit option */}
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
                    icon: '',
                    serial: '',
                    meta_keywords: '',
                    meta_title: '',
                    content: '',
                    meta_description: '',
                    faq: [],
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
        <Button onClick={handleSubmit} disabled={isLoading}>
          {value?.id
            ? loadingUpdate
              ? 'Updating...'
              : 'Update'
            : isLoading
              ? 'Submiting...'
              : 'Submit'}
        </Button>
      </div>
    </div>
  );
}

export default AddData;
