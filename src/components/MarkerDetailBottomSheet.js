import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback} from "@gorhom/bottom-sheet";
import { vw } from "react-native-css-vh-vw";
import { ScrollView } from 'react-native-gesture-handler';
import {getMarkerDetail, postChatRoom, getMarkerReview, getMarkerInfo} from "@apis/apiServices";
import useApi from "@apis/useApi";
import {useRecoilValue} from "recoil";
import {userState, SCREEN} from "@apis/atoms";
import {Tag} from "@components/Tag";
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Star from 'react-native-star-view';

const SkeletonLayout = [
	{
		flexDirection: 'row',
		children: [
			{
				width: 75,
				height: 75,
				borderRadius: 50,
			},
			{
				marginLeft: 20,
				flexDirection: 'column',
				children: [
					{
						width: 100,
						height: 20,
						marginBottom: 6,
					},
					{
						width: 200,
						height: 20,
						marginBottom: 6,
					},
					{
						width: 100,
						height: 20,
						marginBottom: 6,
					},
				],
			},
		]
	},
];

const MarkerDetail = ({ bottomSheetModalRef, detail, navigation, detailLoading }) => {
	const [postLoading, postResolved, postChatRoomApi] = useApi(postChatRoom, true);
	const [markerinfoLoading, markerInfoSolved, markerInfoApi] = useApi(getMarkerInfo, true);
	const [markerReviewLoading, markerReviewResolved, markerReviewApi] = useApi(getMarkerReview, true);
	
	const user = useRecoilValue(userState);

	useEffect(() => {
		if (detail) {
			markerInfoApi(detail?.helper.id)
			.then(res => {
				console.log(res, 'helper info');
			})
			.catch(error => {
				console.log(error);
			})
		}
	}, [detail]);

	useEffect(() => {
		if (detail) {
			markerReviewApi(detail?.helper.id)
			.then(res => {
				console.log(res, 'mrker review');
			})
			.catch(error => {
				console.log("error");
			})
		}
	}, [detail]);

	return (
		<SkeletonContent
			containerStyle = {{}} // 없으면 오류
			layout={SkeletonLayout}
			isLoading = { detailLoading }
		>
			<View style={styles.helperInfoContainer}>
				<View style={styles.helperInfo}>
					<Image style={styles.profileImage} source={require('@assets/images/test.png')} />

				<View style={styles.helperInfoText}>
					<Text style={styles.name}>{detail?.helper.first_name}</Text>
					<View style={styles.helperStarContainer}>
						<Text>{markerInfoSolved ? markerInfoSolved.score.slice(0, -1) : 0}</Text>
						<Star score={markerInfoSolved ? markerInfoSolved.score : 0} style={styles.helperStar} />
						<Text>
							({markerInfoSolved ? markerInfoSolved.review_count : 0}개)
						</Text>
					</View>
				</View>
			</View>

				{
					user?.role === 'Teen' ? (
						<View style={styles.connectButton}>
							<TouchableOpacity
								onPress={() => {
									if (!postResolved) {
										const formData = new FormData();
										formData.append('helper_id', detail.helper.id);
										formData.append('teen_id', user.id);
										postChatRoomApi(formData)
											.then((res) => {
												navigation.navigate(SCREEN.ChatRoom, {
													id: res.id,
													roomName: res.room_name,
													teen: res.teen,
													helper: res.helper,
												});

												bottomSheetModalRef.current?.close();
											})
										console.log("연결");
									}
								}}
							>
								<Text style={{color: "#ffffff"}}>연결</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={{...styles.connectButton, backgroundColor: "#AE46FF"}}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate(SCREEN.Donate, {
										helper: detail?.helper,
									});
									bottomSheetModalRef.current?.close();
								}}
							>
								<Text style={{color: "white"}}>후원</Text>
							</TouchableOpacity>
						</View>
					)
				}

			</View>
			<ScrollView>
				<View style={styles.canHelpInfo}>
					<View style={styles.canHelpInfoText}>
						<Text style={{color: "#26c967"}}>메세지 가능</Text>
						<Text>오전 9:00부터 메세지 가능</Text>
					</View>
					<View style={styles.tag}>
						<Tag tags={detail?.tag}/>
					</View>
				</View>
				<View style={styles.activityImages}>
					<Image source={{uri: detail?.image}} style={styles.activityImage1} />
					{/*<View style={styles.activityImageContainer}>*/}
					{/*	<Image source={require("../../imageTest1.png")} style={styles.activityImage2} />*/}
					{/*	<Image source={require("../../imageTest1.png")} style={styles.activityImage2} />*/}
					{/*</View>*/}
				</View>
				<View>
					<Text style={{fontSize: 24}}>개요</Text>
					<View style={styles.helperContentItem}>
						<Text style={{color: "black"}}>저는 헬퍼 {detail?.helper.first_name}입니다.</Text>
					</View>
					<View style={styles.helperContentItem}>
						<Text style={{color: "black"}}>{detail?.explanation}</Text>
					</View>
				</View>
				<View style={styles.review}>
					<View style={styles.reviewHeader}>
						<View style={styles.reviewHeaderLeft}>
							<Text style={{color: "#ffc107", fontSize: 30}}>{markerInfoSolved ? markerInfoSolved.score.slice(0, -1) : 0.0}</Text>
							<Star score={markerInfoSolved ? markerInfoSolved.score : 0} style={styles.helperStar} />
							<Text>({markerInfoSolved ? markerInfoSolved.review_count : 0}개)</Text>
						</View>
						<View style={styles.reviewHeaderRight}>
							<View>
								{markerReviewResolved ? markerReviewResolved.map((review, idx) => {
									idx < 3 ? <Text>hello</Text> : null
								}) : null}
							</View>
							<View style={styles.reviewHeaderRightMoreButton}>
								<TouchableWithoutFeedback onPress={() => {
									// navigation.navigate(SCREEN.Review);
									navigation.navigate(SCREEN.MarkerRiviewList, {
										user: user?.role,
										markerReviewResolved: markerReviewResolved,
										name: detail.helper.first_name,
									});
									bottomSheetModalRef.current.close();
								}}>
									<Text style={{color: "#2990f6"}}>모든 리뷰 보기</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</SkeletonContent>
	)
}

const MarkerDetailBottomSheet = ({ navigation, bottomSheetModalRef, selectedMarkerId }) => {
	const [detailLoading, detailResolved, getDetail, setDetailLoading] = useApi(getMarkerDetail, true);

	useEffect(() => {
		setDetailLoading(true);
		getDetail(selectedMarkerId);
	},[selectedMarkerId])

	return (
		<View style={styles.container}>
			<MarkerDetail
				bottomSheetModalRef={bottomSheetModalRef}
				detailLoading={detailLoading}
				detail={detailResolved}
				navigation={navigation}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		paddingRight: "5%",
		paddingLeft: "5%",
		paddingBottom: "20%",
	},
	helperInfoContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginBottom: "5%"
	},
	helperInfo: {
		display: "flex",
		flexDirection: "row",
	},
	profileImage: {
		width: 75,
		height: 75,
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
		color: "black",
		fontSize: 20,
	},
	helperStarContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 2,
		marginTop: 5
	},
	helperStar: {
		width: 100,
		height: 20,
		marginLeft: 5,
		marginRight: 5
	},
	connectButton: {
		width: 75,
		height: 30,
		backgroundColor: "#0b68ff",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: 10,
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 10,
	},
	canHelpInfo: {
		display: "flex",
		width: "70%",
		justifyContent: "space-between",
	},
	canHelpInfoText: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	tag: {
		display: 'flex',
		flexDirection: 'row',
		width: vw(100)
	},
	activityImages: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20
	},
	activityImageContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginLeft: vw(2),
		height: vw(40)
	},
	activityImage1: {
		width: vw(80),
		height: vw(45),
		borderWidth: 1,
		borderColor: "black",
		borderRadius: vw(5),
	},
	activityImage2: {
		width: vw(40),
		height: vw(19),
		borderWidth: 1,
		borderColor: "black",
		borderRadius: vw(3),
	},
	helperContentItem: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, 0.1)",
		paddingBottom: 10,
		marginTop: 10
	},
	review: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginTop: 20,
		marginBottom: 20
	},
	reviewHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		marginBottom: 10
	},
	reviewHeaderLeft: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	reviewHeaderRight: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		marginLeft: vw(5),
		width: "100%"
	},
	reviewHeaderRightMoreButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		marginTop: 10
	}
});

export default MarkerDetailBottomSheet;
