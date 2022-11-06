import React, {useEffect, useRef} from 'react';
import { Bootpay } from 'react-native-bootpay-api';
import {useRecoilState} from "recoil";
import {ACTION, SCREEN, actionState, userState} from "@apis/atoms";
import useApi from "@apis/useApi";
import {getUser, postCertificate} from "@apis/apiServices";

const Certification = ({ navigation }) => {
    const bootpay = useRef(null);
    const [action, setAction] = useRecoilState(actionState);
    const [user, setUser] = useRecoilState(userState);
    const [getUserLoading, getUserResult, getUserApi] = useApi(getUser, true);
    const [postCertificateLoading, postCertificateResult, postCertificateApi] = useApi(postCertificate, true);

    useEffect(() => {
        const payload = {
            pg: '다날',
            method: '본인인증',
            order_name: '본인인증',
            authentication_id: '12345_21345', //개발사에 관리하는 주문번호 (본인인증용)
        }
        //기타 설정
        const extra = {
            app_scheme: "teenlief", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
            // show_close_button: true, // x 닫기 버튼 삽입 (닫기버튼이 없는 PG사를 위한 옵션)
        }

        // const extra = new Extra();
        if(bootpay != null && bootpay.current != null) bootpay.current.requestAuthentication(payload, [], {}, extra);
    }, []);

    const onCancel = (data) => {
        console.log('-- cancel', data);
    }

    const onError = (data) => {
        console.log('-- error', data);
    }

    const onIssued = (data) => {
        console.log('-- issued', data);
    }

    const onConfirm = (data) => {
        console.log('-- confirm', data);
        if (bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
    }

    const onDone = (data) => {
        console.log('-- done', data);

        postCertificateApi();

        setAction(ACTION.Upload);
    }

    const onClose = () => {
        console.log('-- closed');
        getUserApi()
            .then((res) => {
                setUser(res);
            })
        navigation.navigate(SCREEN.Home);
    }

    return (
        <Bootpay
            ref={bootpay}
            ios_application_id={'5b8f6a4d396fa665fdc2b5e9'}
            android_application_id={'5b8f6a4d396fa665fdc2b5e8'}
            // ios_application_id={'5b9f51264457636ab9a07cdd'}
            // android_application_id={'5b9f51264457636ab9a07cdc'}
            onCancel={onCancel}
            onError={onError}
            onIssued={onIssued}
            onConfirm={onConfirm}
            onDone={onDone}
            onClose={onClose}
        />
    );
};

export default Certification;
