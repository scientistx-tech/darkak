import React from "react";

export default function AboutUs() {
  return (
    <div className="w-full px-5 py-10 md:px-10 lg:px-20">
      <div className="text-center">
        <p className="text-2xl font-bold uppercase text-primary md:text-3xl">
          About <span className="text-secondary">Darkak</span>
        </p>
        <p className="mt-3 text-lg text-gray-600 md:text-xl">
          Your One-Stop Destination for Premium Quality Products
        </p>
      </div>

      <div className="mt-6 space-y-4 text-justify leading-relaxed text-gray-700">
        <p>
          Welcome to <span className="font-semibold text-primary">Darkak</span>,
          your go-to destination for high-quality products that blend style,
          innovation, and affordability. We are committed to bringing you a
          premium shopping experience where convenience meets excellence. With a
          carefully curated selection of products, we aim to make shopping
          effortless and enjoyable.
        </p>

        <p>
          At Darkak, we believe that quality should never be compromised. That’s
          why we partner with trusted brands and suppliers to ensure that every
          item you purchase meets our high standards. Whether you’re looking for
          the latest fashion trends, cutting-edge electronics, home essentials,
          or stylish accessories, we have something for everyone.
        </p>

        <p>
          Our team is dedicated to providing a seamless shopping experience,
          from browsing our website to receiving your order at your doorstep.
          With secure payment methods, fast delivery, and a customer support
          team ready to assist you, we make sure your journey with Darkak is
          smooth and satisfying.
        </p>

        <p>
          We are more than just an e-commerce store—we are a community of
          passionate shoppers who value quality and trust. We continuously
          expand our product range and improve our services to meet the evolving
          needs of our customers.
        </p>

        <p className="font-semibold text-primary">
          Thank you for choosing Darkak. We look forward to serving you with the
          best shopping experience!
        </p>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-5" />

      {/* <div className="mt-10 border-t border-gray-300 pt-5 text-center">
        <h3 className="text-xl font-bold text-primary">Contact Us</h3>
        <p className="text-gray-700">Email: info@darkak.com.bd</p>
        <p className="text-gray-700">Phone: 01915665089</p>
        <p className="text-gray-700">Address: Upashahar, Bogura - 5800</p>
      </div> */}
    </div>
  );
}
