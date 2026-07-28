import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, Heart, MoreHorizontal, Search,
  Home, Library, PlusCircle, ListMusic, Mic2,
  Radio, TrendingUp, Clock,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const meta: Meta = {
  title: 'Showcases/Music',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Mock data ────────────────────────────────────────────────────────────────

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  plays: string
  liked: boolean
  emoji: string
}

interface Playlist {
  id: string
  name: string
  count: number
  emoji: string
}

const tracks: Track[] = [
  { id: '1', title: 'Blinding Lights',        artist: 'The Weeknd',     album: 'After Hours',       duration: '3:20', plays: '4,1B', liked: true,  emoji: '🌙' },
  { id: '2', title: 'As It Was',              artist: 'Harry Styles',   album: "Harry's House",     duration: '2:37', plays: '2,9B', liked: false, emoji: '☀️' },
  { id: '3', title: 'Flowers',                artist: 'Miley Cyrus',    album: 'Endless Summer',    duration: '3:20', plays: '1,8B', liked: true,  emoji: '🌸' },
  { id: '4', title: 'Unholy',                 artist: 'Sam Smith',      album: 'Gloria',            duration: '2:37', plays: '1,5B', liked: false, emoji: '🔥' },
  { id: '5', title: 'Anti-Hero',              artist: 'Taylor Swift',   album: 'Midnights',         duration: '3:20', plays: '3,2B', liked: true,  emoji: '🦸' },
  { id: '6', title: 'About Damn Time',        artist: 'Lizzo',          album: 'Special',           duration: '3:13', plays: '0,9B', liked: false, emoji: '✨' },
  { id: '7', title: 'Bad Habit',              artist: 'Steve Lacy',     album: 'Gemini Rights',     duration: '3:52', plays: '1,1B', liked: false, emoji: '💔' },
  { id: '8', title: 'Hold My Hand',           artist: 'Lady Gaga',      album: 'Top Gun: Maverick', duration: '3:44', plays: '0,8B', liked: true,  emoji: '🤝' },
]

const albums = [
  { id: '1', title: 'After Hours',        artist: 'The Weeknd',  emoji: '🌙', year: '2020' },
  { id: '2', title: "Harry's House",      artist: 'Harry Styles',emoji: '🏠', year: '2022' },
  { id: '3', title: 'Midnights',          artist: 'Taylor Swift',emoji: '🌙', year: '2022' },
  { id: '4', title: 'Renaissance',        artist: 'Beyoncé',     emoji: '👑', year: '2022' },
  { id: '5', title: 'Un Verano Sin Ti',   artist: 'Bad Bunny',   emoji: '🐰', year: '2022' },
  { id: '6', title: 'Special',            artist: 'Lizzo',       emoji: '✨', year: '2022' },
]

const playlists: Playlist[] = [
  { id: '1', name: 'Favoritas',      count: 42,  emoji: '❤️' },
  { id: '2', name: 'Para trabalhar', count: 28,  emoji: '💻' },
  { id: '3', name: 'Academia',       count: 35,  emoji: '💪' },
  { id: '4', name: 'Relaxar',        count: 19,  emoji: '🌿' },
  { id: '5', name: 'Festas',         count: 67,  emoji: '🎉' },
  { id: '6', name: 'Anos 2000',      count: 54,  emoji: '📼' },
]

// ─── Album card ──────────────────────────────────────────────────────────────

function AlbumCard({ album, active = false, onPlay }: { album: typeof albums[0]; active?: boolean; onPlay: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group space-y-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          'relative w-full aspect-square rounded-lg flex items-center justify-center text-5xl select-none transition-shadow',
          active ? 'bg-primary/15 ring-2 ring-primary' : 'bg-muted',
          hovered && 'shadow-lg',
        )}
      >
        {album.emoji}
        {hovered && (
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg transition-opacity"
          >
            <div className="size-10 rounded-full bg-primary flex items-center justify-center shadow-xl">
              <Play className="size-5 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </button>
        )}
      </div>
      <div>
        <p className={cn('text-sm font-medium truncate', active ? 'text-primary' : 'text-foreground')}>{album.title}</p>
        <p className="text-xs text-muted-foreground truncate">{album.artist} · {album.year}</p>
      </div>
    </div>
  )
}

// ─── Music app ───────────────────────────────────────────────────────────────

function MusicApp() {
  const [playing, setPlaying] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [volume, setVolume] = useState([70])
  const [progress, setProgress] = useState([38])
  const [muted, setMuted] = useState(false)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set(tracks.filter((t) => t.liked).map((t) => t.id)))
  const [activeSection, setActiveSection] = useState<'home' | 'library'>('home')
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null)

  function toggleLike(id: string) {
    setLikedTracks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background flex-col">
      <div className="flex flex-1 min-h-0">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="w-56 shrink-0 flex flex-col bg-sidebar border-r border-border">
          {/* Logo */}
          <div className="px-4 py-4 flex items-center gap-2.5 border-b border-border">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-primary-foreground">♪</span>
            </div>
            <span className="text-sm font-bold text-sidebar-foreground tracking-tight">Eixo Music</span>
          </div>

          {/* Nav */}
          <nav className="p-2 space-y-0.5">
            {[
              { id: 'home',    icon: Home,     label: 'Início' },
              { id: 'search',  icon: Search,   label: 'Buscar' },
              { id: 'library', icon: Library,  label: 'Minha Biblioteca' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as 'home' | 'library')}
                className={cn(
                  'w-full flex items-center gap-3 px-3 h-9 rounded-md text-sm transition-colors text-left',
                  activeSection === id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          <Separator className="mx-3" />

          {/* Playlists */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex items-center justify-between px-3 py-1.5">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Playlists</p>
              <Button variant="ghost" size="icon" className="size-5">
                <PlusCircle className="size-3.5" />
              </Button>
            </div>
            <div className="space-y-0.5">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => setActivePlaylist(pl.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 h-8 rounded-md text-sm transition-colors text-left',
                    activePlaylist === pl.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent',
                  )}
                >
                  <span className="text-base leading-none">{pl.emoji}</span>
                  <span className="flex-1 truncate text-xs">{pl.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{pl.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <div className="shrink-0 h-12 flex items-center gap-3 px-6 border-b border-border bg-background">
            <div className="flex-1 relative max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <input
                className="w-full h-8 pl-8 pr-3 text-sm bg-muted rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Buscar músicas, artistas..."
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Plano Premium</Badge>
              <Avatar className="size-7">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">GJ</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">

            {/* Albums grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Em Alta</h2>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Ver tudo</Button>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                {albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    active={currentTrack.album === album.title}
                    onPlay={() => {
                      const t = tracks.find((t) => t.album === album.title) ?? tracks[0]
                      setCurrentTrack(t)
                      setPlaying(true)
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Track list */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Top 50 — Global</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs gap-1">
                    <TrendingUp className="size-3" />
                    Atualizado hoje
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Ver tudo</Button>
                </div>
              </div>

              <div className="space-y-0.5">
                {/* Header */}
                <div className="grid grid-cols-[24px_1fr_120px_80px_40px] gap-3 px-4 py-1.5 text-[11px] text-muted-foreground uppercase tracking-wider border-b border-border mb-1">
                  <span>#</span>
                  <span>Título</span>
                  <span>Álbum</span>
                  <span className="flex items-center justify-end gap-1"><Clock className="size-3" /></span>
                  <span />
                </div>
                {tracks.map((track, i) => {
                  const active = currentTrack.id === track.id
                  return (
                    <div
                      key={track.id}
                      onDoubleClick={() => { setCurrentTrack(track); setPlaying(true) }}
                      className={cn(
                        'group grid grid-cols-[24px_1fr_120px_80px_40px] gap-3 px-4 py-2 rounded-md items-center cursor-pointer transition-colors hover:bg-muted',
                        active && 'bg-primary/5',
                      )}
                    >
                      <span className={cn('text-sm font-mono', active ? 'text-primary' : 'text-muted-foreground')}>
                        {active && playing ? (
                          <span className="flex gap-0.5 items-end h-4">
                            {[1,2,3].map((b) => (
                              <span key={b} className="w-0.5 bg-primary rounded-full animate-pulse" style={{ height: `${[12,8,14][b-1]}px`, animationDelay: `${b*0.15}s` }} />
                            ))}
                          </span>
                        ) : (
                          <span className="group-hover:hidden">{i + 1}</span>
                        )}
                        {!active && (
                          <button
                            className="hidden group-hover:block"
                            onClick={() => { setCurrentTrack(track); setPlaying(true) }}
                          >
                            <Play className="size-3.5 fill-current" />
                          </button>
                        )}
                      </span>

                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl leading-none">{track.emoji}</span>
                        <div className="min-w-0">
                          <p className={cn('text-sm font-medium truncate', active ? 'text-primary' : 'text-foreground')}>{track.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground truncate">{track.album}</p>

                      <div className="text-xs text-muted-foreground text-right">{track.duration}</div>

                      <button
                        onClick={() => toggleLike(track.id)}
                        className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className={cn(
                          'size-4 transition-colors',
                          likedTracks.has(track.id) ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-foreground',
                        )} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Categorias */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">Explorar por categoria</h2>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Pop',        emoji: '🎵', color: 'from-purple-500/30 to-purple-500/10' },
                  { label: 'Rock',       emoji: '🎸', color: 'from-red-500/30 to-red-500/10' },
                  { label: 'Hip-Hop',    emoji: '🎤', color: 'from-orange-500/30 to-orange-500/10' },
                  { label: 'Eletrônica', emoji: '🎧', color: 'from-blue-500/30 to-blue-500/10' },
                  { label: 'Samba',      emoji: '🥁', color: 'from-green-500/30 to-green-500/10' },
                  { label: 'Jazz',       emoji: '🎷', color: 'from-amber-500/30 to-amber-500/10' },
                ].map(({ label, emoji, color }) => (
                  <div
                    key={label}
                    className={cn('relative h-20 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br', color, 'hover:opacity-90 transition-opacity')}
                  >
                    <span className="absolute top-3 left-3 text-2xl">{emoji}</span>
                    <span className="absolute bottom-3 left-3 text-sm font-bold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ── Player (rodapé fixo) ─────────────────────────────────── */}
      <div className="shrink-0 h-20 border-t border-border bg-card px-6 flex items-center gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 w-52 shrink-0 min-w-0">
          <div className="size-12 rounded-lg bg-muted flex items-center justify-center text-2xl shrink-0 select-none">
            {currentTrack.emoji}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <button onClick={() => toggleLike(currentTrack.id)} className="shrink-0 ml-auto">
            <Heart className={cn(
              'size-4 transition-colors',
              likedTracks.has(currentTrack.id) ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-foreground',
            )} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center gap-1.5 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
              <Shuffle className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const i = tracks.findIndex((t) => t.id === currentTrack.id)
                setCurrentTrack(tracks[(i - 1 + tracks.length) % tracks.length])
              }}
            >
              <SkipBack className="size-5 fill-current" />
            </Button>
            <button
              className="size-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
              onClick={() => setPlaying((v) => !v)}
            >
              {playing
                ? <Pause className="size-4 fill-background text-background" />
                : <Play className="size-4 fill-background text-background ml-0.5" />}
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const i = tracks.findIndex((t) => t.id === currentTrack.id)
                setCurrentTrack(tracks[(i + 1) % tracks.length])
              }}
            >
              <SkipForward className="size-5 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
              <Repeat className="size-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-[11px] text-muted-foreground w-8 text-right tabular-nums">
              {`${Math.floor(progress[0] / 60)}:${String(progress[0] % 60).padStart(2, '0')}`}
            </span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              min={0}
              max={200}
              step={1}
              className="flex-1"
            />
            <span className="text-[11px] text-muted-foreground w-8 tabular-nums">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-36 shrink-0 justify-end">
          <button onClick={() => setMuted((v) => !v)} className="text-muted-foreground hover:text-foreground">
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <Slider
            value={muted ? [0] : volume}
            onValueChange={(v) => { setVolume(v); setMuted(false) }}
            min={0}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <MusicApp />,
}
