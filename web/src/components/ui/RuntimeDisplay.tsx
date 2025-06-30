import { useTranslations } from 'next-intl'

interface IRuntimeDisplayProps {
    runtime: number
}

const RuntimeDisplay = ({ runtime }: IRuntimeDisplayProps) => {
    const t = useTranslations('runtime')
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return (
        <span>
            {hours > 0 && hours + t('hr')} {minutes > 0 && minutes + t('min')}
        </span>
    )
}

export default RuntimeDisplay
