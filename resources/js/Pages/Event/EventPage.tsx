import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { PageHeaderV1 } from "../../Components/General/PageHeader";

import heroImage from "../../../../public/images/aboutHeroImage.png";
import SuperGraphics from "@/Components/SuperGraphics";
import SearchBarSection from "./Section/SearchBarSection";
import TabSection from "../About/Section/TabSection";
import EventsSection from "./Section/EventsSection";

export default function AboutPage({
    auth,
    WebconfigData,
    cache,
    helper,
}: PageProps<{ WebconfigData: any; cache: any; helper: string }>) {
    return (
        <>
            <Head>
                <title>Event Page</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <Guest>
                <div className="flex flex-col justify-center items-center">
                    <PageHeaderV1
                        // ini sementara doang, nanti ambil dari companyData
                        pageImage={heroImage}
                        pageTitle="Lorem Ipsum Dolor Sit Amet Consectetur"
                        pageSubTitle="EVENT"
                        pageDescription="FSD Lab is a laboratory under the faculty of art and design which functions as a support system for academic studies focused on Faculty of Art and Design, and general support for UMN."
                    />
                    <SearchBarSection />
                    <EventsSection />
                    {/* <TabSection /> */}
                    {/* Another components here */}
                </div>
            </Guest>
        </>
    );
}
