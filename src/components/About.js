import sziv from "../assets/gifs/sziv3.gif";
import tulip from "../assets/gifs/virag3.gif";
import personalImage from "../assets/eszti_about_personal.jpeg";

export default function About() {
    return (
        <div className="my-16 max-w-3xl mx-auto p-8">
            {/* About Section with sziv */}
            <div
                className="flex flex-col md:flex-row items-center gap-8 mb-8"> {/* Changed items-start to items-center */}
                <div className="md:w-3/4 order-1">
                    <h3 className="text-xl">𝓐𝓫𝓸𝓾𝓽</h3>
                    <div className="whitespace-pre-line text-gray-700">
                        {`
ESZTI Kondász is a Hungarian illustrator based in Budapest.
Her illustrations are rich in vivid and vibrant colours inspired by the world of Risography.

In her work she frequently incorporates symbolic elements, tarot motifs, and botanical details, while also exploring themes of feminism and mental health.

A distinctive feature of her style is the playful personification of inanimate objects around us often accompanied by a thoughtful play on double or alternative meanings.
`}
                    </div>
                </div>
                <div className="md:w-1/4 order-2 flex justify-center"> {/* Added flex justify-center */}
                    <img
                        src={sziv}
                        alt="Illustration by Eszti"
                        className="w-32 h-auto max-h-[500px] object-contain"
                    />
                </div>
            </div>

            {/* Work Section with tulip */}
            <div
                className="flex flex-col md:flex-row items-center gap-8 mb-8"> {/* Changed items-start to items-center */}
                <div className="md:w-1/4 order-2 md:order-1 flex justify-center"> {/* Added flex justify-center */}
                    <img
                        src={tulip}
                        alt="Illustration by Eszti"
                        className="w-32 h-auto max-h-[500px] object-contain"
                    />
                </div>
                <div className="md:w-3/4 order-1 md:order-2">
                    <h3 className="text-xl">𝓦𝓸𝓻𝓴</h3>
                    <div className="whitespace-pre-line text-gray-700">
                        {`
She has extensive experience as an illustrator for children's magazines, along with a growing portfolio in editorial illustration across both print and digital media. 
Her work has appeared in women's magazines and psychology publications, and she has contributed to various feminist editorial projects. 

Clients include: Glamour magazine, HVG Psychology magazine, Lazy Women, ... While she continues to enjoy children's publishing, her current focus is on a broader range of editorial work.

You can find her art prints in design stores across Budapest, including ISBN+, valamini, Szerkesztősèg, and Pikszis Kultúrpont, and at Budapest design fairs like Makers Market. 

She works both from home and from Valami Produktív, a creative studio in the city center, where she collaborates with other artists and focuses on building a community.
`}
                    </div>
                </div>
            </div>

            {/* Appearances section (full width) */}
            <div className="w-full">
                <h3 className="text-xl mb-4">𝓐𝓹𝓹𝓮𝓪𝓻𝓪𝓷𝓬𝓮𝓼, 𝓪𝓬𝓱𝓲𝓮𝓿𝓮𝓶𝓮𝓷𝓽𝓼 𝓪𝓷𝓭 𝓹𝓾𝓫𝓵𝓲𝓬𝓪𝓽𝓲𝓸𝓷𝓼</h3>
                <div className="text-gray-700">
                    <p className="font-semibold mt-6">2025:</p>
                    <ul className="list-disc pl-8 ">
                        <li className="pl-2">'Woman to Woman' self initiated collaborative zine with 8 female creators
                            for
                            International Women's Day
                        </li>
                    </ul>

                    <p className="font-semibold mt-4">2024:</p>
                    <ul className="list-disc pl-8 ">
                        <li className="pl-2">Erasmus for Young Entrepreneurs, Barcelona, La Gloria Factoria de Arte,
                            ceramics and mosaic art
                        </li>
                        <li className="pl-2"><span className="font-bold">ARC</span> exhibition, Budapest, Family trauma
                            tree
                        </li>
                        <li className="pl-2">Memorial exhibition for Ervin Lázár, Kisszékely</li>
                        <li className="pl-2"><span className="font-bold">Térkép bárhova</span> (Map to anywhere)
                            anthology,
                            Két Hold Kiadó
                        </li>
                        <li className="pl-2">Editorial illustrations in <span
                            className="font-bold">HVG Pszichológia</span> magazine 2024/4
                        </li>
                        <li className="pl-2">Cover illustration for children's art and literature magazine, Csodaceruza,
                            issue 2024/01
                        </li>
                        <li className="pl-2">Kidlit illustrations for Csodaceruza and Csiribiri magazines, issues
                            2024/01,02,03,04 and more
                        </li>
                        <li className="pl-2"><span className="font-bold">Helsinki</span> exhibition with Budapest
                            Illustration Festival
                        </li>
                    </ul>

                    <p className="font-semibold mt-4">2023:</p>
                    <ul className="list-disc pl-8 ">
                        <li className="pl-2">Cover Illustration for <span
                            className="font-bold">"The Budapester"</span> exhibition, Budapest
                        </li>
                        <li className="pl-2"><span className="font-bold">TRAKTA</span> illustration exhibition, 3rd
                            place
                            selected by jury
                        </li>
                        <li className="pl-2"><span className="font-bold">3rd Budapest Illustration Festival</span>:
                            Children
                            Fiction and Sándor Petőfi anniversary categories
                        </li>
                        <li className="pl-2">Illustration + design for Zabella Zine, contemporary literary zine, 11th
                            issue
                        </li>
                        <li className="pl-2">Istanbul <span className="font-bold">Borderless Artbook Festival</span>
                        </li>
                        <li className="pl-2"><span className="font-bold">2023: Ukmukfukk Zine Festival, Budapest</span>
                        </li>
                    </ul>

                    <p className="font-semibold mt-4">2021:</p>
                    <ul className="list-disc pl-8 ">
                        <li className="pl-2"><span className="font-bold">2nd Budapest Illustration Festival</span>:
                            Silent
                            Book category selected participant
                        </li>
                    </ul>
                </div>
            </div>

            {/* Personal Image at the bottom */}
            <div className="mt-12 flex justify-center">
                <img
                    src={personalImage}
                    alt="Eszti Kondász"
                    className="w-full max-w-xl"
                />
            </div>
        </div>
    );
}