// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Homepage() {
  return (
    <div>
      <div className="relative">
        <header className="text-5xl md:text-7xl lg:text-8xl pt-5">
          <h1>
            Welcome to <br />
            <p className="font-semibold text-gray-600">Notii.</p>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-500 rounded-full blur-3xl opacity-40 h-[35vh] w-[35dvh] top-[2dvh] left-10 z-[-10]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-500 rounded-full blur-3xl opacity-40 h-[50vh] w-[35dvh] top-[60dvh] left-[470px] z-[-10]"></div>
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
        <img
          className="rounded-3xl"
          src="https://www.freevector.com/uploads/vector/preview/31593/freevectorFinanceFinancialLiteracyIllustrationay0222revisi_generated.jpg"
          alt="firstimage"
        />
      </div>
      <section className="">
        <h2 className="text-2xl text-center py-3 font-semibold">Features</h2>
        <ul className="flex flex-col w-[90dvw] mx-auto md:grid md:grid-cols-3 md:h-[20dvh] text-center gap-5 text-2xl lg:text-4xl lg:py-0 md:text-3xl">
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 px-3 text-gray-500 hover:scale-105 transition duration-300">
            Create and edit notes <br />{" "}
            <p className="text-[20px] py-3 text-yellow-800">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo,
              esse?
            </p>
          </li>
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 px-3 text-gray-500 hover:scale-105 transition duration-300">
            Organize notes with categories or tags <br />
            <p className="text-[20px] py-3 text-yellow-800">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </li>
          <li className="bg-slate-200 rounded-2xl shadow-lg shadow-gray-400 py-3 px-3 text-gray-500 hover:scale-105 transition duration-300">
            Search for specific notes <br />
            <p className="text-[20px] py-3 text-yellow-800">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </li>
        </ul>
        <br />
      </section>
      <p className="py-[4dvh] md:py-[10dvh] md:pl-6">
        &copy; 2024 My Notes App
      </p>
    </div>
  );
}
