import {ReactElement} from "react";
import Layout from "@/components/layouts/Layout";
import Home from "@/pages/index";

const UsersPage = () => {
    return <>Users</>
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default UsersPage;