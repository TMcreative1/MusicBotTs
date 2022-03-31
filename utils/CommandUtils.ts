import {ExtendedInteraction} from "../typings/CommandType";
import {Player, QueryType} from "discord-player";
import {GuildChannelResolvable, GuildResolvable} from "discord.js";
import playdl from "play-dl";

class CommandUtils {
    async checkVoiceChannel(interaction: ExtendedInteraction) {
        if (!interaction.member.voice.channel) {
            return await interaction.editReply({
                content: 'You are not in a voice channel!'
            });
        }

        if (interaction.guild?.me?.voice.channelId && interaction.member.voice.channelId !== interaction.guild?.me?.voice.channelId) {
            return await interaction.reply({
                content: 'You are not in my voice channel!'
            });
        }
    }

    async playMusic(query: string, player: Player, interaction: ExtendedInteraction) {
        const searchResult = await player
            .search(query as string, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(err => {
                console.error(err);
            });

        if (!searchResult || !searchResult.tracks.length) {
            return await interaction.editReply({
                content: 'No results were found!'
            });
        }

        const queue = player.createQueue(interaction.guild as GuildResolvable, {
            ytdlOptions: {
                quality: 'highest',
                filter: 'audioonly',
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
            },
            metadata: interaction.channel,
            // @ts-ignore
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube")
                    return (await playdl.stream(track.url, {
                        discordPlayerCompatibility: true
                    })).stream;
            }
        });

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel as GuildChannelResolvable);
            }
        } catch (err) {
            player.deleteQueue(interaction.guildId as GuildResolvable);
            return await interaction.editReply({
                content: 'Could not join your voice channel!'
            });
        }

        const isSingleTrack = !searchResult.playlist;

        await interaction.editReply({
            content: `⏱ | Loading your ${isSingleTrack ? `track ${searchResult.tracks[0].title}` : 'playlist'}...`
        });

        return {queue: queue, searchResult: searchResult, isSingleTrack: isSingleTrack};
    }
}

export const commandUtils = new CommandUtils();