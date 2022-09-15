import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRecoilState} from "recoil";
import {Touchable} from "react-native-toast-message/lib/src/components/Touchable";
import {tokenState, userState} from "@apis/atoms";
import RNRestart from "react-native-restart";
import {TouchableWithoutFeedback} from "@gorhom/bottom-sheet";
import {vh, vw} from "react-native-css-vh-vw";
import { Shadow } from 'react-native-shadow-2';
import {Line} from "react-native-svg";
import {logout} from "@utils/Logout";

const ProfileCard = ({user}) => {
	return (
		<Shadow distance={3} offset={[3,23]}>
			<View style={{...profileCardStyles.profileCard, backgroundColor:user.role==="Helper" ? '#AE46FF' : '#00A3FF'}}>
				<View style={profileCardStyles.userInfoContainer}>
					<View style={profileCardStyles.userInfo}>
						<Image style={profileCardStyles.profileImage} source={require('../components/img/test.png')}/>
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

const Profile = () => {
	const [user, setUser] = useRecoilState(userState)
	const [token, setToken] = useRecoilState(tokenState);



	return (
		<ScrollView>
		<View style={containerStyles.container}>
			<ProfileCard user={user.user}/>


			{
				user.user.role==="Helper" ? (
					<>
						<Text style={{...containerStyles.label, marginTop: 30}}>포인트 관리</Text>
						<CircularContainer title={`포인트 ${10000}원`}>
							<CircularButton title={"출금하기"} color={'#AE46FF'}/>
						</CircularContainer>
						<Text style={{...containerStyles.label, marginTop: 30}}>활동 관리</Text>
						<CircularContainer title={`현재 등록된 리뷰 ${100}개`}>
							<CircularButton title={"전체보기"} color={'#AE46FF'}/>
						</CircularContainer>
						<CircularContainer title={`현재 등록된 마커 ${3}개`} style={{marginTop: 12}}>
							<CircularButton title={"전체보기"} color={'#AE46FF'}/>
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
				user.user.role === "Helper" ? (<LineButton title={"계좌 관리"}/>) : null
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
