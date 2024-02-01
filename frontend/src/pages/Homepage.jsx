// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Homepage() {
  return (
    <div className="overflow-hidden">
      <div className="relative">
        <header className="text-8xl md:text-9xl lg:text-10xl pt-5">
          <h1>
            Welcome to <br />
            <p className="font-semibold text-gray-600">Notii.</p>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-500 rounded-full blur-3xl opacity-40 h-[40vh] w-[40dvh] top-[2dvh] z-[-10] left-[300px] md:left-[500px] lg:left-[800px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-500 rounded-full blur-3xl opacity-40 h-[40vh] w-[40dvh] top-[140dvh] md:top-[95dvh] lg:top-[100dvh] left-[300px] md:left-[630px] lg:left-[800px] z-[-10]"></div>
        </header>
      </div>
      <div className="text-3xl py-10 md:grid md:grid-cols-2 object-center justify-center pl-3 pr-3 gap-3 flex flex-col md:text-4xl lg:text-5xl">
        <section>
          <p className="py-3">
            Start jotting down your thoughts and ideas. <br />
            <p className="italic text-gray-500">
              This simple notes app helps you stay organized.
            </p>
          </p>
          <p className="py-3">Get started by creating your first note!</p>
        </section>
        <img className="rounded-3xl image" src="/image1.jpg" alt="firstimage" />
      </div>
      <section className="">
        <h2 className="text-2xl text-center py-3 font-semibold">Features</h2>
        <ul className="flex flex-col w-[90dvw] mx-auto md:grid md:grid-cols-3 md:h-[20dvh] text-center gap-5 text-2xl lg:text-4xl lg:py-0 md:text-3xl font-semibold">
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 text-gray-500 hover:scale-105 transition duration-300">
            Create and edit notes <br />{" "}
            <p className="text-[20px] py-3 text-yellow-800 font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo,
              esse?
            </p>
          </li>
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 text-gray-500 hover:scale-105 transition duration-300 font-semibold">
            Organize notes with categories or tags <br />
            <p className="text-[20px] py-3 text-yellow-800 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </li>
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 text-gray-500 hover:scale-105 transition duration-300 font-semibold">
            Search for specific notes <br />
            <p className="text-[20px] py-3 text-yellow-800 font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </li>
        </ul>
        <br />
      </section>
      <p className="pt-[4dvh] pb-2 md:pt-[15dvh] md:pl-6">
        &copy; 2024 My Notes App
      </p>
    </div>
  );
}
