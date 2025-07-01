export interface IUserSettings {
    userId: string
    ui: Record<string, unknown>
    watchlist: { [key: string]: unknown }
    videoPlayer: Record<string, unknown>
    notifications: Record<string, unknown>
    parentalControl: Record<string, unknown>
    privacy: Record<string, unknown>
    locale: Record<string, unknown>
    accessibility: Record<string, unknown>
    updatedAt: string
}
