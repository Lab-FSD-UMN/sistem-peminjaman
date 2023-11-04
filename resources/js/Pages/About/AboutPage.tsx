import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PageHeaderV1 } from "../../Components/General/PageHeader";

import heroImage from "../../../../public/images/aboutHeroImage.png";

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
                    {/* Another components here */}
                </div>
            </Guest>
        </>
    );
}
