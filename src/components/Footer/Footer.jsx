import React from 'react'
import {assets} from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <>
    <div className="mt-8 bg-slate-800 pt-9">
    <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
    <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
      <div className="md:w-[316px]">
        <span><img src={assets.GOFOOD}/></span>
        <p className="mt-[18px] text-sm font-normal text-white/[80%]">GoFood is an innovative food ordering and delivery platform. With an easy-to-use mobile app and website, GoFood allows users to browse diverse cuisines, place orders effortlessly, and enjoy quick doorstep delivery. Known for its user-friendly interface, promotional offers, and reliable service.</p>
        <div className="mt-[18px] flex gap-4">
          <a className="hover:scale-110" target="_blank"
            href="#"><img src={assets.facebook_icon}/></a>
          <a className="hover:scale-110" target="_blank"
            href="/"><img src={assets.linkedin_icon}/></a>
          <a className="hover:scale-110" target="_blank"
            href="/"><img src={assets.twitter_icon}/></a>
        </div>
      </div>
      <div className="md:w-[316px]">
        <div className="mt-[23px] flex">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
           <img src={assets.call}></img>
          </div>
          <div className="ml-[18px]">
            <a href="tel:+911800123444" className="text-[14px] font-medium text-white">+91 1800123444</a>
            <p className=" text-[12px] font-medium text-white">Support Number</p>
          </div>
        </div>
        <div className="mt-[23px] flex">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
            <img src={assets.mail}/>
          </div>
          <div className="ml-[18px]">
            <a href="mailto:help@lorem.com" className=" text-[14px] font-medium text-[#fff]">help@gofood.com</a>
            <p className=" text-[12px] font-medium text-[#fff]">Support Email</p>
          </div>
        </div>
        <div className="mt-[23px] flex">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
            <img src={assets.location}/>
          </div>
          <div className="ml-[18px]">
            <a href="mailto:help@lorem.com" className="text-[14px] font-medium text-[#fff]">Ratanada, Rajasthan,
              India, 123456</a>
            <p className="text-[12px] font-medium text-white">Address</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
        <div className="">
          <p className="text-deutziawhite text-[18px] font-medium leading-normal">PAGES</p>
          <ul>
            <li className="mt-[15px]">
              <a className="text-deutziawhite hover:text-deutziawhite/80 text-[15px] font-normal hover:font-semibold"
                href="/">Home</a></li>
            <li className="mt-[15px]">
              <a className="text-deutziawhite hover:text-deutziawhite/80 text-[15px] font-normal hover:font-semibold"
                href="#footer">Contact</a></li>
            <li className="mt-[15px]"><a
                className="text-deutziawhite hover:text-deutziawhite/80 text-[15px] font-normal hover:font-semibold"
                href="/menu">Menu</a></li>
            <li className="mt-[15px]">
              <a className="text-deutziawhite hover:text-deutziawhite/80 text-[15px] font-normal hover:font-semibold"
                href="/privacy-policy">Privacy policy</a></li>
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:mt-0">
          <p className="text-deutziawhite text-[18px] font-medium">DOWNLOAD THE APP</p>
          <div className="flex gap-4 sm:flex-col">
            <a target="_blank"
              href="#"><img src={assets.play_store}/></a><a
              target="_blank"
              href="#"><img src={assets.app_store}/></a>
          </div>
        </div>
      </div>
    </div>
    <hr className="mt-[30px] text-white" />
    <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
      <p className="text-[10px] font-normal text-white md:text-[12px]">
        © Copyright 2024, All Rights Reserved by GOFOOD.com
      </p>
    </div>
    </div>
    </div>
    </>
  )
}

export default Footer