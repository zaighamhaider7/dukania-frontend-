import "./CreateStore.css";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Store, Upload, MessageCircle, Link2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function CreateStore() {

  const jwttoken = localStorage.getItem("jwttoken");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);



  const [storeData, setStoreData] = useState({
    storeName: "",
    storeUsername: "",
    whatsappNumber: "",
    category: "",
    description: "",
    logo: null
  })

  const handleChange = (e) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setStoreData({
      ...storeData,
      logo: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!storeData.storeName.trim()) {
      newErrors.storeName = "Store Name is required";
    }

    if (!storeData.storeUsername.trim()) {
      newErrors.storeUsername = "Store Username is required";
    }

    if (!storeData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "Whatsapp Number is required";
    }

    if (!storeData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("storeName", storeData.storeName);
    formData.append("storeUsername", storeData.storeUsername);
    formData.append("whatsappNumber", storeData.whatsappNumber);
    formData.append("category", storeData.category);

    if (storeData.description) {
      formData.append("description", storeData.description);
    }
    if (storeData.logo) {
      formData.append("logo", storeData.logo);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/store/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      );

      toast.success(response.data.msg);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");

    } catch (error) {
      const data = error.response.data;

      if (data.field) {
        setErrors({
          [data.field]: data.msg,
        });
      } else {
        toast.error(data.msg);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="create-store">
        <div className="create-store__heading">
          <h1 className="create-store__title">Create Store</h1>
          <p className="create-store__sub">
            Set up your storefront so customers can browse and order on WhatsApp.
          </p>
        </div>

        <div className="create-store__grid">
          <div className="form-card">
            <form className="store-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-field">
                <label className="form-label">Store Name <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Sana's Boutique"
                  className="form-input"
                  value={storeData.storeName}
                  name="storeName"
                  onChange={handleChange}
                />
                {errors.storeName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.storeName}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Store Username <span className="required">*</span> (Unique URL) </label>
                <div className="form-input-wrap">
                  <span className="form-input-prefix">dukania.vercel.app/</span>
                  <input
                    type="text"
                    placeholder="mystore"
                    className="form-input form-input--prefixed"
                    value={storeData.storeUsername}
                    name="storeUsername"
                    onChange={handleChange}
                  />

                </div>
                <p className="form-helper">This will be your public store URL.</p>

                {errors.storeUsername && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.storeUsername}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">WhatsApp Number <span className="required">*</span></label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  className="form-input"
                  value={storeData.whatsappNumber}
                  name="whatsappNumber"
                  onChange={handleChange}
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Store Category <span className="required">*</span></label>
                <select
                  className="form-input form-select"
                  name="category"
                  value={storeData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  <option value="Clothing & Fashion">Clothing & Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Health & Pharmacy">Health & Pharmacy</option>
                  <option value="Food & Groceries">Food & Groceries</option>
                  <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                  <option value="Bakery & Sweets">Bakery & Sweets</option>
                  <option value="Books & Stationery">Books & Stationery</option>
                  <option value="Mobile & Accessories">Mobile & Accessories</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Toys & Kids">Toys & Kids</option>
                  <option value="Jewelry & Watches">Jewelry & Watches</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Store Description (Optional)</label>
                <textarea
                  placeholder="Tell customers a little about your store..."
                  className="form-input form-textarea"
                  rows={4}
                  value={storeData.description}
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-field">
                <label className="form-label">Store Logo (Optional)</label>
                <label className="logo-upload">
                  <Upload size={18} />
                  <span>{storeData.logo
                    ? storeData.logo.name
                    : "Click to upload a logo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="logo-upload__input"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="form-actions">

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn--primary  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Store..." : "Create Store"}

                </button>
                <button type="button" className="btn btn--outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* ===================== PREVIEW CARD ===================== */}
          {/* <div className="preview-card">
            <p className="preview-card__label">Store Preview</p>

            <div className="preview-logo">
              {logoPreview ? (
                <img src={logoPreview} alt="Store logo" className="preview-logo__img" />
              ) : (
                <Store size={26} />
              )}
            </div>

            <h3 className="preview-store-name">
              {storeName ? storeName : "Your Store Name"}
            </h3>

            <p className="preview-store-desc">
              {description
                ? description
                : "Your store description will appear here once you write one."}
            </p>

            <button type="button" className="btn btn--primary preview-whatsapp-btn">
              <MessageCircle size={16} />
              Order on WhatsApp
            </button>

            <div className="preview-url">
              <Link2 size={14} />
              <span>dukan.com/{username ? username : "mystore"}</span>
            </div>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateStore;
