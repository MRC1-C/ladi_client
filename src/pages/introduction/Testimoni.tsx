import React, { useRef } from "react";
import Slider from "react-slick";
import Stars from "/assets/Icon/stars.svg";
import ArrowBack from "/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "/assets/Icon/eva_arrow-next-fill.svg";
interface Testimony {
  name: string;
  image: string;
  city: string;
  country: string;
  rating: string;
  testimoni: string;
}

interface TestimoniProps {
  listTestimoni?: Testimony[];
}

const Testimoni: React.FC<TestimoniProps> = ({
  listTestimoni = [
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
  ]
}) => {
  const settings = {
    dots: true,
    customPaging: function() {
      return(
        <a className="">
          <span className="rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all"></span>
        </a>
      )
    },
    dotsClass: "slick-dots w-max absolute bottom-[-40px]",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={sliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-purple-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <img
                    src={listTestimonis.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-black-500 capitalize">
                      {listTestimonis.city},{listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex">
                    <img src={Stars} className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”.</p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-purple-500 border hover:bg-purple-500 hover:text-white-500 transition-all text-purple-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img src={ArrowBack} className="h-6 w-6" alt="Arrow Back" />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-purple-500 border hover:bg-purple-500 hover:text-white-500 transition-all text-purple-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img src={ArrowNext} className="h-6 w-6" alt="Arrow Next" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
