import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PageHeaderV1 } from "../../Components/General/PageHeader";

import heroImage from "../../../../public/images/aboutHeroImage.png";
import SuperGraphics from "@/Components/SuperGraphics";
import VisionSection from "./Section/VisionSection";
import MissionSection from "./Section/MissionSection";
import TeamHeroSection from "./Section/TeamHeroSection";
import TabSection from "./Section/TabSection";

export default function AboutPage({
    auth,
    WebconfigData,
    cache,
    helper,
}: PageProps<{ WebconfigData: any; cache: any; helper: string }>) {
    const companyData: any = usePage().props.companyData; // get page info

    return (
        <>
            <Head>
                <title>About Page</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <Guest>
                <div className="flex flex-col justify-center items-center">
                    <PageHeaderV1
                        // ini sementara doang, nanti ambil dari companyData
                        pageImage={heroImage}
                        pageTitle="Enabling Conversation Between Creativity and Innovation"
                        pageSubTitle="FACULTY OF ART AND DESIGN"
                        pageDescription="FSD Lab is a laboratory under the faculty of art and design which functions as a support system for academic studies focused on Faculty of Art and Design, and general support for UMN."
                    />
                    <div className="h-1/2 w-full overflow-y-hidden mb-10 md:mb-20">
                        <SuperGraphics
                            style="fill-color"
                            className="w-full opacity-20"
                        />
                    </div>
                    <VisionSection sectionTitle="" sectionDescription=""/>
                    <MissionSection />
                    <TeamHeroSection />
                    <TabSection />
                    {/* Another components here */}
                </div>
            </Guest>
        </>
    );
}
