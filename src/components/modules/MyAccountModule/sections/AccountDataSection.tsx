import InformationColumn from "../module-elements/InformationColumn"
import FullNameModal from "../module-elements/FullNameModal"
import EmailModal from "../module-elements/EmailModal"
import UpdateIdentityNumberModal from "../module-elements/UpdateIdentityNumberModal"
import PasswordModal from "../module-elements/PasswordModal"

const AccountDataSection = () => {
    return <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold py-4">My Account</h1>
        <div className="flex flex-col w-full space-y-2">
            <FullNameModal>
            <InformationColumn 
                    title={"Fullname"} 
                    value={"Ramiz Azhar"}>
            </InformationColumn>
            </FullNameModal>
            <EmailModal>
            <InformationColumn 
                    title={"Email"} 
                    value={"ramizbrain@gmail.com"}>
            </InformationColumn>
            </EmailModal>
            <UpdateIdentityNumberModal>
            <InformationColumn 
                    title={"Identity Number"} 
                    value={"NIK 3354645654648"}>
            </InformationColumn>
            </UpdateIdentityNumberModal>
            <PasswordModal>
            <InformationColumn 
                    title={"Add Password"}
                    isPassword={true} 
                    value={"gopaygojektokopedia"}>
            </InformationColumn>
            </PasswordModal>                         
            </div>
    </div>
}
export default AccountDataSection