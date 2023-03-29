"use client";

import { IconButton } from "../components/button";
import styles from "../components/home.module.scss";
import Locale from "../locales";
import SendWhiteIcon from "../icons/send-white.svg";
import { useCallback, useState } from "react";
import LoadingIcon from "../icons/three-dots.svg";
const tdData = [
    {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PQeqmbL7VJmKR99qM4JBBFJm/user-ADDSgRc0CBksEVUdUIAjWRYG/img-iuN7dQwxiXZRbh8vBKIKnTKK.png?st=2023-03-29T05%3A11%3A23Z&se=2023-03-29T07%3A11%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-28T23%3A34%3A34Z&ske=2023-03-29T23%3A34%3A34Z&sks=b&skv=2021-08-06&sig=Jaeb5DmgSn/umDb9vkEIfzW1Q4Qfl26i4lfAaaG15Do%3D"
    },
    {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PQeqmbL7VJmKR99qM4JBBFJm/user-ADDSgRc0CBksEVUdUIAjWRYG/img-vJl8PypXnfOyhJvD5MBUaZfl.png?st=2023-03-29T05%3A11%3A23Z&se=2023-03-29T07%3A11%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-28T23%3A34%3A34Z&ske=2023-03-29T23%3A34%3A34Z&sks=b&skv=2021-08-06&sig=K5RBRt3B8/eoqoPsl7RcRGBTAKFRX2WvFrxmO%2B4KR9g%3D"
    }
]
const Page = () => {
    const [loading, setLoading] = useState(false)
    const [srcList, setSrcList] = useState<{ url: string }[]>([])
    const [userInput, setUserInput] = useState('')
    const onUserSubmit = useCallback(() => {
        if (!userInput) return alert('缺少描述!')
        setLoading(true)
        fetch("/api/photo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userInput }),
        })
            .then(res => res.json())
            .then(data => setSrcList(data.data))
            .finally(() => setLoading(false))
    }, [userInput])
    return (
        <div style={{ width: 750, maxWidth: '100%', position: 'relative' }}>
            <div className={styles["chat-input-panel"]} style={{ position: 'relative', }}>
                <div className={styles["chat-input-panel-inner"]}>
                    <textarea
                        className={styles["chat-input"]}
                        placeholder={'输入图片描述生成图片...'}
                        rows={3}
                        onInput={(e) => setUserInput(e.currentTarget.value)}
                        value={userInput}
                        autoFocus
                    />
                    <IconButton
                        icon={<SendWhiteIcon />}
                        text={Locale.Chat.Send}
                        className={styles["chat-input-send"] + " no-dark"}
                        onClick={onUserSubmit}
                    />
                </div>
            </div>
            {loading ? <div style={{ margin: 20, display: 'grid', placeContent: 'center' }}><LoadingIcon /></div> :
                <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr', padding: '0 20px' }}>
                    {srcList.map(item => <img style={{ width: '100%', height: 'auto' }} key={item.url} src={item.url} />)}
                </div>
            }
        </div>
    )
}

export default Page