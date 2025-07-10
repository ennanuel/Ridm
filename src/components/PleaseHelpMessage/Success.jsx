import { FiInstagram, FiMail, FiTwitter } from "react-icons/fi";
import IconAndCloseButton from "./IconAndCloseButton";


const SOCIALS = [{ link: 'https://x.com/nnanna-ezema', Icon: FiTwitter }, { link: 'https://instagram.com/by.ezema', Icon: FiInstagram }, { link: 'mailto:emmanuelezema21@gmail.com', Icon: FiMail }];
const OTHER_PROJECTS = [{ link: 'https://scoreplug.vercel.app', title: "Scoreplug" }, { link: 'https://tekst-live.netlify.app/spaces', title: "Tekst" }, { link: 'https://transira.vercel.app', title: "Transira" }];

const Success = ({ closeModal }) => {
    return (
        <div className="p-6 max-w-[400px] w-full min-h-[400px] bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">You're Awesome, Thanks!</h1>
                <p className="text-sm text-gray-400">Thank you so much! Your response will help a solo developer like me keep this project going (and show off my work!). Ridm will return for those who enjoyed it. Check out my other stuff below or reach out!</p>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-xs text-gray-400">Socials</span>
                <div className="flex flex-wrap gap-2">
                    {
                        SOCIALS.map(({ link, Icon }, index) => (
                            <a key={index} href={link} target="_blank" className="flex items-center justify-center w-10 aspect-square rounded-full bg-white/5 hover:bg-white/10 text-white">
                                <Icon size={16} />
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-xs text-gray-400">Other projects</span>
                <div className="flex flex-wrap gap-2">
                    {
                        OTHER_PROJECTS.map(({ link, title }, index) => (
                            <a key={index} href={link} target="_blank" className="flex items-center justify-center h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white">
                                <span className="text-sm">{title}</span>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default Success;