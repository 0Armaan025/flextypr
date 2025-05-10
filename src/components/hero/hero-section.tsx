import Image from "next/image";
import { Hanalei_Fill } from "next/font/google";
import { FeatureField } from "../feature-field/FeatureField";
import { GraduationCap, Handshake, KeyboardIcon } from "lucide-react";

const BarriecitoFont = Hanalei_Fill({
    subsets: ["latin"],
    weight: "400",
});

export const HeroSection = () => {
    return (
        <>
            <div className="heroSection flex flex-row  items-center">
                <div className="left-box flex flex-col ml-48 mt-30 justify-center items-start">
                    <h2 className={`text-8xl font-bold tracking-wider underline decoration-blue-600 decoration-wavy ${BarriecitoFont.className} bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  bg-clip-text inline-block text-transparent`}>FlexTypr</h2>
                    <h3 className="text-xl w-[30rem] mt-8">Flex your typing skills to your opponents, heheehe, this is nothing but just a fun typing battle simulator...</h3>


                    <button className="bg-red-400 w-60 h-12 text-xl font-semibold cursor-pointer transition-all duration-300 hover:bg-red-500 mr-12 mt-4 rounded-[4px] px-2 py-1 text-white">les go</button>


                </div>
                <div className="right-box flex flex-col ">
                    <Image src="/p_typing.png" alt="logo" width={400} height={500} className="ml-96 mt-20" /> {/* this should work*/}

                </div>

            </div>
            <div className="flex flex-col items-center justify-center mt-20">

                <h4 className="text-4xl font-semibold">I KNOW THE UI SUCKS, BUT IT WORKS, OK?</h4>

                <div className="flex flex-row justify-center items-center">
                    {FeatureFieldItems.map((item, index) => (
                        <FeatureField key={index} description={item.description} lucideIcon={item.lucideIcon} title={item.title} />
                    ))}
                </div>

                <button className="font-semibold mt-8 bg-gray-300 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-400 transition-all duration-400 h-12 w-50">Alright, let's start!</button>
            </div>
        </>
    );
}

const FeatureFieldItems = [
    {
        title: "Have fun",
        description: "Have fun against your friends.",
        lucideIcon: () => <Handshake />
    },
    {
        title: "Typing Battle",
        description: "Battle against your friends in a typing duel.",
        lucideIcon: () => <KeyboardIcon />
    },
    {
        title: "Learn",
        description: "Actually learn how to type faster...",
        lucideIcon: () => <GraduationCap />
    }
]