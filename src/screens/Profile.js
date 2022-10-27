import React, {useRef} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRecoilState} from "recoil";
import {tokenState, userState, SCREEN} from "@apis/atoms";
import {vh, vw} from "react-native-css-vh-vw";
import { Shadow } from 'react-native-shadow-2';
import {logout} from "@utils/Logout";
import { BootpayWebView } from 'react-native-bootpay';
import useApi from "@apis/useApi";
import {getUser, postPointEvent} from "@apis/apiServices";

const ProfileCard = ({user}) => {
	return (
		<Shadow distance={3} offset={[3,23]}>
			<View style={{...profileCardStyles.profileCard, backgroundColor:user.role==="Helper" ? '#AE46FF' : '#00A3FF'}}>
				<View style={profileCardStyles.userInfoContainer}>
					<View style={profileCardStyles.userInfo}>
						<Image style={profileCardStyles.profileImage} source={require('@assets/images/test.png')}/>
						<View style={profileCardStyles.helperInfoText}>
							<Text style={profileCardStyles.name}>{user.first_name}</Text>
							<View style={profileCardStyles.helperStarContainer}>
								<Text style={profileCardStyles.email}>{user.email}</Text>
							</View>
						</View>
					</View>

					<View style={profileCardStyles.connectButton}>
						<Image style={{width: 40, height: 40}} source={require('@assets/images/app_icon.png')}/>
					</View>
				</View>
				<Text style={profileCardStyles.role}>{user.role}</Text>
			</View>
		</Shadow>
	)
}

const CircularContainer = ({title, children, style}) => (
	<View style={style}>
		<Shadow distance={3} offset={[3,3]}>
			<View style={elementStyles.circularContainer}>
				<Text style={elementStyles.title}>{title}</Text>
				{children}
			</View>
		</Shadow>
	</View>

)

const CircularButton = ({title, color, onPress}) => (
	<TouchableOpacity style={{...elementStyles.circularButton, backgroundColor: color}} onPress={onPress}>
		<Text style={elementStyles.circularButtonText}>{title}</Text>
	</TouchableOpacity>
)

const LineButton = ({title, onPress}) => (
	<TouchableOpacity style={elementStyles.lineButton} onPress={onPress}>
		<Text style={elementStyles.lineButtonText}>{title}</Text>
	</TouchableOpacity>
)

const Profile = ({navigation}) => {
	const [user, setUser] = useRecoilState(userState)
	const [token, setToken] = useRecoilState(tokenState);

	const bootpay = useRef(null);

	const [postChargePointLoading, postChargePointResolved, chargePoint] = useApi(postPointEvent, true);
	const [getUsersLoading, getUsersResolved, getUserCallback] = useApi(getUser, true);

	const handleDeposit = () => {
		const payload = {
			pg: 'payapp',
			name: '1000 포인트', //결제창에 보여질 상품명
			order_id: '1', //개발사에 관리하는 주문번호
			method: 'card',
			price: 1000 //결제금액
		}

		//결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함
		const items = [
			{
				item_name: '1000 포인트', //통계에 반영될 상품명
				qty: 1, //수량
				unique: '1', //개발사에서 관리하는 상품고유번호
				price: 1000, //상품단가
			}
		]

		//구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보
		const userInfo = {
			id: user?.id, //개발사에서 관리하는 회원고유번호
			username: user?.first_name, //구매자명
			phone: '01012345678', //전화번호, 페이앱 필수
		}

		//기타 설정
		const extra = {
			app_scheme: "teenlief", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
			offer_period: "", //결제창 제공기간에 해당하는 string 값, 지원하는 PG만 적용됨
			popup: 0, //1이면 popup, 아니면 iframe 연동
			quick_popup: 1, //1: popup 호출시 버튼을 띄우지 않는다. 아닐 경우 버튼을 호출한다
			locale: "ko",
			theme: "purple",
			iosCloseButton: false
		}

		if (bootpay != null && bootpay.current != null) bootpay.current.request(payload, items, userInfo, extra);
	}

	const onCancel = (data) => {
		console.log('cancel', data);
	}

	const onError = (data) => {
		console.log('error', data);
	}

	const onReady = (data) => {
		console.log('ready', data);
	}

	const onConfirm = (data) => {
		console.log('confirm', data);
		if(bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
	}

	const onDone = (data) => {
		console.log('done', data);

		const formData = new FormData();
		formData.append('sender', user?.id);
		formData.append('receiver', user?.id);
		formData.append('point', 1000);
		formData.append('data', JSON.stringify(data));
		chargePoint(formData)
			.then((res) => {
				getUserCallback()
					.then((userdata) => {
						setUser(userdata);
					})
			})
	}

	const onClose = () => {
		console.log('closed');
	}

	return (
		<ScrollView>
			<BootpayWebView
				ref={bootpay}
				ios_application_id={'6326ebe2d01c7e001cf5ee1a'}
				android_application_id={'6326ebe2d01c7e001cf5ee19'}
				onCancel={onCancel}
				onError={onError}
				onReady={onReady}
				onConfirm={onConfirm}
				onDone={onDone}
				onClose={onClose}
			/>

			<View style={containerStyles.container}>
				<ProfileCard user={user}/>


			{
				user.role==="Helper" ? (
					<>
						<Text style={{...containerStyles.label, marginTop: 30}}>포인트 관리</Text>
						<CircularContainer title={`포인트 ${user.point}원`}>
							<CircularButton title={"입금하기"} color={'#AE46FF'} onPress={handleDeposit} />
							<CircularButton title={"출금하기"} color={'#AE46FF'} />
						</CircularContainer>
						<Text style={{...containerStyles.label, marginTop: 30}}>활동 관리</Text>
						<CircularContainer title={`현재 등록된 리뷰`}>
							<CircularButton title={"전체보기"} color={'#AE46FF'}/>
						</CircularContainer>
						<CircularContainer title={`현재 등록된 마커`} style={{marginTop: 12}}>
							<CircularButton title={"전체보기"} color={'#AE46FF'} onPress={() => {navigation.push(SCREEN.MarkerManage)}}/>
						</CircularContainer>
					</>
				) : (
					<>
						<Text style={{...containerStyles.label, marginTop: 30}}>리뷰 관리</Text>
						<CircularContainer title={`현재 등록한 리뷰 ${100}개`}>
							<CircularButton title={"전체 보기"} color={'#00A3FF'}/>
						</CircularContainer>
						<CircularContainer title={"올릴 리뷰"} style={{marginTop: 12}}>
							<CircularButton title={"리뷰 작성하기"} color={'#00A3FF'}/>
						</CircularContainer>
					</>
				)
			}

				<Text style={{...containerStyles.label, marginTop: 40}}>개인정보 관리</Text>
				<LineButton title={"비밀번호 변경"}/>
				{
					user.role === "Helper" ? (<LineButton title={"계좌 관리"}/>) : null
				}
				<LineButton title={"로그아웃"} onPress={() => {logout(setToken)}}/>
			</View>
		</ScrollView>
	);
};

const containerStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		alignItems: 'center',
		height: vh(110)
	},
	label: {
		marginVertical: 12,
		alignSelf: "flex-start",
		fontWeight: "bold",
		color: "black"
	}
})

const elementStyles = StyleSheet.create({
	circularContainer: {
		width: vw(90),
		height: 50,
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: "center",
		borderRadius: vw(4),
		backgroundColor: 'white',
		padding: 12
	},
	title: {
		fontWeight: "bold",
		color: "black"
	},
	circularButton: {
		width: "30%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10
	},
	circularButtonText: {
		color: 'white',
		fontWeight: 'bold'
	},
	lineButton: {
		marginVertical: 2,
		width: vw(85),
		height: 42,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		paddingLeft: 10
	},
	lineButtonText: {
		fontWeight: "bold",
		color: 'black'
	}
})

const profileCardStyles = StyleSheet.create({
	profileCard: {
		width: vw(90),
		height: vw(90/16*9), // 황금비율
		justifyContent: "space-between",
		elevation: 10,
		borderRadius: vw(3),
		padding: 24,
		marginTop: 20
	},
	profileCardInfo: {
		flex: 1,
		flexDirection: "row"
	},
	userInfoContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginBottom: "5%"
	},
	userInfo: {
		display: "flex",
		flexDirection: "row",
	},
	profileImage: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 50,
	},
	helperInfoText: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		marginLeft: 10,
	},
	name: {
		color: "white",
		fontSize: 15,
		fontWeight: "bold"
	},
	email: {

	},
	role: {
		fontSize: 42,
		fontStyle: "italic",
		fontWeight: "bold",
		color: "white"
	}
})

export default Profile;