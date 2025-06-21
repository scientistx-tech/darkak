export default function transformAliExpressProduct(product: any) {
  const skuList = product?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o || [];

  const baseInfo = product.ae_item_base_info_dto || {};
  const multimedia = product.ae_multimedia_info_dto || {};
  const delivery = product.logistics_info_dto || {};

  // Optional: derive attributes from sku list
  const attributesMap = new Map<string, any>();

  for (const sku of skuList) {
    const props = sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o || [];
    for (const prop of props) {
      const key = prop.sku_property_name;
      if (!attributesMap.has(key)) {
        attributesMap.set(key, {
          id: prop.sku_property_id,
          title: prop.sku_property_name,
          options: [],
        });
      }

      const group = attributesMap.get(key);
      const alreadyExists = group.options.find(
        (opt: any) => opt.title === prop.sku_property_value,
      );
      if (!alreadyExists) {
        group.options.push({
          title: prop.sku_property_value,
          price: Number(sku.offer_sale_price),
          stock: sku.sku_available_stock,
          sku: sku.sku_attr,
          image: prop.sku_image,
          productId: product.product_id,
        });
      }
    }
  }

  const keywords = product.ae_item_properties?.ae_item_property || [];

  return {
    title: baseInfo.subject || "",
    short_description: "", // not available
    meta_title: baseInfo.subject || "",
    meta_image: multimedia.image_urls?.split(";")[0] || "",
    meta_description: baseInfo.subject || "",
    meta_keywords: keywords.map((k: any) => k.attr_value).join(","),
    ae_item_sku_info_dtos: product?.ae_item_sku_info_dtos,
    video_link: "", // not available
    thumbnail: multimedia.image_urls?.split(";")[0] || "",
    price: String(Math.round(skuList?.[0]?.offer_sale_price) || 0),
    discount_type: "flat", // assume flat
    discount: "",
    tax_amount: "0", // not available
    tax_type: "include",
    available: "in-stock",
    warranty: "darkak",
    warranty_time: "",
    region: product.ae_store_info?.store_country_code || "CN",
    stock: String(skuList?.[0]?.sku_available_stock || 0),
    minOrder: "1",
    unit: "piece",
    code: skuList[0].sku_id,
    specification: "", // not available
    description: baseInfo.detail || "",
    warranty_details: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    brandId: "",
    keywords: keywords.map((k: any) => k.attr_value).join(","),
    images: multimedia.image_urls?.split(";") || [],
    delivery_info: {
      delivery_time: String(delivery.delivery_time || "7"),
      delivery_charge: "",
      delivery_time_outside: String(delivery.delivery_time || "7"),
      delivery_charge_outside: "",
      return_days: "7",
      multiply: "false",
    },
    items: Array.from(attributesMap.values()),
    drafted: false,
  };
}
