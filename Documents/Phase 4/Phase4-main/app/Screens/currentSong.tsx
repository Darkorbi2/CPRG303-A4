import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

export default function currentSong() {
	const scheme = useColorScheme() ?? 'dark';
	const c = Colors[scheme];
	const router = useRouter();

	const [isPlaying, setIsPlaying] = useState(true);
	const [isShuffle, setIsShuffle] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
	const [isFav, setIsFav] = useState(false);
	const [progress, setProgress] = useState(0.2); // 0–1

	const DURATION = '3:17';
	const CURRENT = '0:38';

	const SONG_TITLE = 'Song Name';
	const ARTIST_NAME = 'ARTIST NAME';

	return (
		<LinearGradient
			colors={['#0A1923', '#050D14']}
			locations={[0, 1]}
			style={styles.screen}
		>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
					<Ionicons name="chevron-back" size={24} color={c.text} />
				</TouchableOpacity>
				<Text style={[styles.headerTitle, { color: c.text }]}>NOW PLAYING</Text>
				<TouchableOpacity style={styles.headerBtn}>
					<Ionicons name="ellipsis-horizontal" size={22} color={c.text} />
				</TouchableOpacity>
			</View>

			{/* Album Art */}
			<View style={styles.artContainer}>
				<LinearGradient
					colors={['#C8923A', '#8B4513', '#4A1C2C']}
					locations={[0, 0.5, 1]}
					style={styles.albumArt}
				/>
			</View>

			{/* Song Info */}
			<View style={styles.infoRow}>
				<View style={{ flex: 1 }}>
					<Text style={[styles.songTitle, { color: c.text }]}>{SONG_TITLE}</Text>
					<Text style={[styles.artistName, { color: c.muted }]}>{ARTIST_NAME}</Text>
				</View>
			</View>

			{/* Waveform + Add + Fav Row */}
			<View style={styles.waveRow}>
				<TouchableOpacity style={[styles.roundBtn, { backgroundColor: '#1A2535' }]}>
					<Ionicons name="add" size={20} color={c.text} />
				</TouchableOpacity>

				{/* Fake waveform bars */}
				<View style={styles.waveform}>
					{[14, 22, 30, 20, 36, 28, 24, 32, 18, 26, 34, 22, 28].map((h, i) => (
						<View
							key={i}
							style={[
								styles.waveBar,
								{
									height: h,
									backgroundColor: i < 5 ? '#4FC3F7' : 'rgba(79,195,247,0.35)',
								},
							]}
						/>
					))}
				</View>

				<TouchableOpacity
					onPress={() => setIsFav(!isFav)}
					style={[styles.roundBtn, { backgroundColor: isFav ? '#C0507A' : '#1A2535' }]}
				>
					<Ionicons name={isFav ? 'heart' : 'heart-outline'} size={20} color="#fff" />
				</TouchableOpacity>
			</View>

			{/* Progress Bar */}
			<View style={styles.progressContainer}>
				<View style={[styles.progressTrack, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
					<View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: '#4FC3F7' }]} />
					<View
						style={[
							styles.progressThumb,
							{ left: `${progress * 100}%`, backgroundColor: '#fff' },
						]}
					/>
				</View>
				<View style={styles.timesRow}>
					<Text style={[styles.timeText, { color: c.muted }]}>{CURRENT}</Text>
					<Text style={[styles.timeText, { color: c.muted }]}>{DURATION}</Text>
				</View>
			</View>

			{/* Playback Controls */}
			<View style={styles.controls}>
				<TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
					<Ionicons
						name="shuffle"
						size={24}
						color={isShuffle ? '#4FC3F7' : c.muted}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<Ionicons name="play-skip-back" size={28} color={c.text} />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setIsPlaying(!isPlaying)}
					style={styles.playBtn}
				>
					<Ionicons
						name={isPlaying ? 'pause' : 'play'}
						size={28}
						color="#fff"
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<Ionicons name="play-skip-forward" size={28} color={c.text} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
					<Ionicons
						name="repeat"
						size={24}
						color={isRepeat ? '#4FC3F7' : c.muted}
					/>
				</TouchableOpacity>
			</View>

			{/* Bottom Action Row */}
			<View style={styles.bottomActions}>
				<TouchableOpacity>
					<Ionicons name="share-social-outline" size={24} color='#4FC3F7' />
				</TouchableOpacity>
				<TouchableOpacity>
					<Ionicons name="musical-notes-outline" size={24} color='#4FC3F7' />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);

}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 24,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 56,
		marginBottom: 28,
	},
	headerBtn: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: 1.5,
	},
	artContainer: {
		alignItems: 'center',
		marginBottom: 28,
	},
	albumArt: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 16,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	songTitle: {
		fontSize: 26,
		fontWeight: '700',
	},
	artistName: {
		fontSize: 13,
		fontWeight: '600',
		letterSpacing: 1,
		marginTop: 2,
	},
	waveRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginBottom: 16,
	},
	roundBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	waveform: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		height: 40,
	},
	waveBar: {
		flex: 1,
		borderRadius: 2,
	},
	progressContainer: {
		marginBottom: 28,
	},
	progressTrack: {
		height: 4,
		borderRadius: 2,
		position: 'relative',
		marginBottom: 8,
	},
	progressFill: {
		height: '100%',
		borderRadius: 2,
	},
	progressThumb: {
		width: 14,
		height: 14,
		borderRadius: 7,
		position: 'absolute',
		top: -5,
		marginLeft: -7,
	},
	timesRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	timeText: {
		fontSize: 12,
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 36,
		paddingHorizontal: 8,
	},
	playBtn: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: '#4FC3F7',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomActions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
	},
});
