import "./AddProduct.css";
import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { toast } from "react-toastify";

import {
  Package,
  UploadCloud,
  X,
  Plus,
  Trash2,
  ImagePlus,
} from "lucide-react";

function AddProduct() {
  const jwttoken = localStorage.getItem("jwttoken");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    discountPrice: "",
    description: "",
    stocks: "",
    images: [],
    variants: [
      {
        id: crypto.randomUUID(),
        name: "",
        values: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);

  //   const newImages = files.map((file) => ({
  //     id: crypto.randomUUID(),
  //     file: file,
  //     url: URL.createObjectURL(file),
  //   }));

  //   setProductData({
  //     ...productData,
  //     images: [...productData.images, ...newImages],
  //   });

  //   e.target.value = "";
  // };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const remainingSlots = 5 - productData.images.length;

    if (remainingSlots <= 0) {
      toast.error("You can upload maximum 5 images");
      e.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.error(`You can upload maximum 5 images`);
    }

    const newImages = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file: file,
      url: URL.createObjectURL(file),
    }));

    setProductData({
      ...productData,
      images: [...productData.images, ...newImages],
    });

    e.target.value = "";
  };

  const removeImage = (id) => {
    setProductData({
      ...productData,
      images: productData.images.filter((img) => img.id !== id),
    });
  };

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [
        ...productData.variants,
        {
          id: crypto.randomUUID(),
          name: "",
          values: "",
        },
      ],
    });
  };

  const removeVariant = (id) => {
    setProductData({
      ...productData,
      variants: productData.variants.filter(
        (variant) => variant.id !== id
      ),
    });
  };

  const updateVariant = (id, field, value) => {
    setProductData({
      ...productData,
      variants: productData.variants.map((variant) =>
        variant.id === id
          ? {
            ...variant,
            [field]: value,
          }
          : variant
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!productData.productName) {
      newErrors.productName = "Product Name is required";
    }

    if (!productData.price) {
      newErrors.price = "Product Price is required";
    }

    if (!productData.images || productData.images.length === 0) {
      newErrors.images = "Product Images is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.price);

    if (productData.discountPrice) {
      formData.append(
        "discountPrice",
        productData.discountPrice
      );
    }

    if (productData.description) {
      formData.append(
        "description",
        productData.description
      );
    }

    if (productData.stocks) {
      formData.append("stocks", productData.stocks);
    }

    productData.images.forEach((image) => {
      formData.append("productImages", image.file);
    });

    const formattedVariants = productData.variants
      .filter(
        (variant) =>
          variant.name.trim() &&
          variant.values.trim()
      )
      .map((variant) => ({
        name: variant.name.trim(),
        options: variant.values
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      }));

    formData.append(
      "variants",
      JSON.stringify(formattedVariants)
    );

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      );

      if (response) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="add-product">

        <div className="add-product__heading">
          <span className="add-product__icon">
            <Package size={20} />
          </span>
          <div>
            <h1 className="add-product__title">Add Product</h1>
            <p className="add-product__sub">
              Fill in the details below to list a new product in your store.
            </p>
          </div>
        </div>

        {/* ===================== FORM ===================== */}

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Product Name
              </label>

              <span className="badge badge--required">
                Required
              </span>
            </div>

            <input
              type="text"
              name="productName"
              placeholder="e.g. Embroidered Kurti"
              className="form-input"
              value={productData.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName}
              </p>
            )}
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Price (Rs)
              </label>

              <span className="badge badge--required">
                Required
              </span>
            </div>

            <input
              type="number"
              name="price"
              placeholder="e.g. 2450"
              className="form-input"
              value={productData.price}
              onChange={handleChange}
              min="0"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price}
              </p>
            )}
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Product Images
              </label>

              <span className="badge badge--required">
                Required
              </span>
            </div>

            <label className="image-upload">
              <UploadCloud size={22} />

              <span className="image-upload__title">
                Click to upload images
              </span>

              <span className="image-upload__hint">
                PNG or JPG, multiple images allowed
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                className="image-upload__input"
                onChange={handleImageUpload}
              />
            </label>

            {productData.images.length > 0 && (
              <div className="image-preview-grid">

                {productData.images.map((img) => (
                  <div
                    key={img.id}
                    className="image-preview"
                  >
                    <img
                      src={img.url}
                      alt="Product preview"
                    />

                    <button
                      type="button"
                      className="image-preview__remove"
                      onClick={() =>
                        removeImage(img.id)
                      }
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {productData.images.length < 5 && (
                  <label className="image-preview image-preview--add">
                    <ImagePlus size={18} />

                    <span>Add More</span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      multiple
                      className="image-upload__input"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

              </div>
            )}

            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images}
              </p>
            )}
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Discount Price (Rs)
              </label>

              <span className="badge badge--optional">
                Optional
              </span>
            </div>

            <input
              type="number"
              name="discountPrice"
              placeholder="e.g. 1999"
              className="form-input"
              value={productData.discountPrice}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Description
              </label>

              <span className="badge badge--optional">
                Optional
              </span>
            </div>

            <textarea
              name="description"
              placeholder="Describe the product — fabric, fit, care instructions..."
              className="form-input form-textarea"
              rows={4}
              value={productData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                stock Quantity
              </label>

              <span className="badge badge--optional">
                Optional
              </span>
            </div>

            <input
              type="number"
              name="stocks"
              placeholder="e.g. 25"
              className="form-input"
              value={productData.stocks}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-field">
            <div className="form-field__label-row">
              <label className="form-label">
                Variants / Options
              </label>

              <span className="badge badge--optional">
                Optional
              </span>
            </div>

            <p className="form-helper">
              Add options like Color or Size, with values
              separated by commas.
            </p>

            <div className="variant-list">

              {productData.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="variant-row"
                >

                  <input
                    type="text"
                    placeholder="Option name (e.g. Color)"
                    className="form-input variant-row__name"
                    value={variant.name}
                    onChange={(e) =>
                      updateVariant(
                        variant.id,
                        "name",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Values (e.g. Black, White, Blue)"
                    className="form-input variant-row__values"
                    value={variant.values}
                    onChange={(e) =>
                      updateVariant(
                        variant.id,
                        "values",
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="variant-row__remove"
                    onClick={() =>
                      removeVariant(variant.id)
                    }
                    aria-label="Remove option"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>
              ))}

            </div>

            <button
              type="button"
              className="add-option-btn"
              onClick={addVariant}
            >
              <Plus size={16} />
              Add Option
            </button>
          </div>

          <div className="form-actions">

            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

            <button
              type="button"
              className="btn btn--outline"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}

export default AddProduct;