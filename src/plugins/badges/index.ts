import ReCord from "@assets/icons/ReCord.png";
import { defineCorePlugin } from "..";
import { findByName } from "@metro";
import { onJsxCreate } from "@lib/api/react/jsx";
import { after } from "@lib/api/patcher";
import { getPluginApi } from "../api";

const useBadgesModule = findByName("useBadges", false);

const badgeProps = {} as Record<any, any>;
const unpatches: (() => void)[] = [];

defineCorePlugin({
    manifest: {
        name: "Badges",
        id: "record.badges",
        authors: [
            {
                name: "tralwdwdd",
                id: "1278723517436788897",
            },
        ],
        version: "1.0.0",
    },
    start() {
        const pluginApi = getPluginApi(this.manifest.id);

        pluginApi.logger.log("TEST");
        onJsxCreate("ProfileBadge", (_, ret) => {
            if (ret.props.id?.startsWith("record-")) {
                const props = badgeProps[ret.props.id];

                if (props) Object.assign(ret.props, props);
            }
        });

        onJsxCreate("RenderedBadge", (_, ret) => {
            if (ret.props.id?.startsWith("record-")) {
                const props = badgeProps[ret.props.id];

                if (props) Object.assign(ret.props, props);
            }
        });

        const BADGE_LABELS: Record<string, string[]> = {
            "1278723517436788897": ["ReCord Developer"],
        };

        unpatches.push(
            after("default", useBadgesModule, ([user], res) => {
                if (!user) return;

                const badges = BADGE_LABELS[user.userId] || [];

                badges.forEach((label, i) => {
                    const badgeId = `record-${user.userId}-${i}`;

                    badgeProps[badgeId] = {
                        id: badgeId,
                        label,
                        source: { uri: ReCord },
                    };

                    res.push({
                        id: badgeId,
                        description: label,
                        icon: " _",
                    });
                });
            }),
        );
    },

    stop() {
        for (const unpatch of unpatches) {
            unpatch();
        }
    },
});
