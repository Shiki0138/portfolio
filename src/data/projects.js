export const projects = [
  {
    id: 1,
    title: '見積もり支援システム (Garden DX System)',
    description: '造園事業者向けの統合業務管理システム。見積書作成から工程管理、予算管理、請求書作成まで一元化。※デモモードのため実際の使用は不可',
    image: 'https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Garden+DX+System',
    tags: ['React', 'Next.js', 'TypeScript', 'Supabase'],
    links: {
      live: 'https://garden-dx-system.vercel.app/',
      github: null
    },
    details: {
      role: 'フルスタック開発者',
      duration: '開発中',
      technologies: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Chart.js'],
      challenges: '造園業界特有の複雑な見積もり体系と工程管理の統合',
      solutions: 'ガントチャート形式の工程表と連動した予算管理システムを実装し、業務フローを効率化',
      features: [
        '見積書作成・管理機能',
        'ガントチャート形式の工程表',
        '予算管理・進捗追跡',
        '請求書自動生成',
        '将来的な拡張機能対応設計',
        '※現在はデモモードのみ提供'
      ]
    }
  },
  {
    id: 2,
    title: 'Eコマースサイト',
    description: 'モダンなオンラインショッピング体験を提供するEコマースプラットフォーム',
    image: 'https://via.placeholder.com/600x400/6C63FF/FFFFFF?text=E-commerce+Site',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    links: {
      live: 'https://example-ecommerce.com',
      github: 'https://github.com/username/ecommerce-project'
    },
    details: {
      role: 'フルスタック開発者',
      duration: '3ヶ月',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      challenges: 'リアルタイムな在庫管理システムの実装と決済処理の最適化',
      solutions: 'Socket.ioを使用したリアルタイム通信とStripe APIを活用したセキュアな決済システムを構築',
      features: [
        'レスポンシブデザイン',
        'リアルタイム在庫管理',
        'セキュアな決済処理',
        'ユーザー認証システム',
        '商品検索・フィルタリング機能'
      ]
    }
  },
  {
    id: 2,
    title: 'タスク管理アプリ',
    description: 'チームのコラボレーションを促進するモダンなタスク管理アプリケーション',
    image: 'https://via.placeholder.com/600x400/FF6584/FFFFFF?text=Task+Manager',
    tags: ['Vue.js', 'Firebase', 'Vuetify'],
    links: {
      live: 'https://example-taskmanager.com',
      github: 'https://github.com/username/task-manager'
    },
    details: {
      role: 'フロントエンド開発者',
      duration: '2ヶ月',
      technologies: ['Vue.js', 'Vuex', 'Firebase', 'Vuetify', 'Chart.js'],
      challenges: 'リアルタイムでのタスクの同期とドラッグ&ドロップによる直感的なUI',
      solutions: 'Firebaseのリアルタイムデータベースとvue-draggableライブラリを組み合わせて実装',
      features: [
        'ドラッグ&ドロップインターフェース',
        'リアルタイム同期',
        'プロジェクト管理',
        '進捗可視化',
        'チームメンバー招待機能'
      ]
    }
  },
  {
    id: 3,
    title: 'ポートフォリオサイト',
    description: '個人の作品を魅力的に展示するアニメーション豊富なポートフォリオサイト',
    image: 'https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Portfolio+Site',
    tags: ['React', 'Styled Components', 'React Spring'],
    links: {
      live: 'https://example-portfolio.com',
      github: 'https://github.com/username/portfolio'
    },
    details: {
      role: 'UI/UXデザイナー & フロントエンド開発者',
      duration: '1ヶ月',
      technologies: ['React', 'Styled Components', 'React Spring', 'Intersection Observer API'],
      challenges: 'パフォーマンスを維持しながら魅力的なアニメーションを実装',
      solutions: 'React SpringとIntersection Observer APIを活用した最適化されたアニメーション',
      features: [
        'スクロールアニメーション',
        'パララックス効果',
        'レスポンシブデザイン',
        'モーダル表示',
        'コンタクトフォーム'
      ]
    }
  },
  {
    id: 4,
    title: '天気予報アプリ',
    description: '美しいUIと詳細な気象情報を提供する天気予報アプリケーション',
    image: 'https://via.placeholder.com/600x400/FF9800/FFFFFF?text=Weather+App',
    tags: ['JavaScript', 'Weather API', 'Chart.js'],
    links: {
      live: 'https://example-weather.com',
      github: 'https://github.com/username/weather-app'
    },
    details: {
      role: 'フロントエンド開発者',
      duration: '2週間',
      technologies: ['Vanilla JavaScript', 'OpenWeatherMap API', 'Chart.js', 'CSS3'],
      challenges: 'APIデータの効率的な管理と美しいデータ可視化',
      solutions: 'Chart.jsを使用したデータ可視化とLocal Storageを活用したキャッシュシステム',
      features: [
        '現在の天気表示',
        '5日間の天気予報',
        '時間別天気グラフ',
        '位置情報連携',
        'お気に入り都市機能'
      ]
    }
  },
  {
    id: 5,
    title: 'ブログプラットフォーム',
    description: 'MarkdownサポートとSEO最適化を備えたモダンなブログプラットフォーム',
    image: 'https://via.placeholder.com/600x400/9C27B0/FFFFFF?text=Blog+Platform',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
    links: {
      live: 'https://example-blog.com',
      github: 'https://github.com/username/blog-platform'
    },
    details: {
      role: 'フルスタック開発者',
      duration: '4ヶ月',
      technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      challenges: 'SEO最適化とMarkdownコンテンツの効率的な管理',
      solutions: 'Next.jsのSSGとISRを活用し、MDXでリッチなコンテンツ作成を実現',
      features: [
        'Markdownエディタ',
        'SEO最適化',
        'コメントシステム',
        'タグ・カテゴリ管理',
        'ダークモード対応'
      ]
    }
  },
  {
    id: 6,
    title: 'チャットアプリケーション',
    description: 'Socket.ioを使用したリアルタイムチャットアプリケーション',
    image: 'https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Chat+App',
    tags: ['Socket.io', 'Express', 'MongoDB'],
    links: {
      live: 'https://example-chat.com',
      github: 'https://github.com/username/chat-app'
    },
    details: {
      role: 'バックエンド開発者',
      duration: '6週間',
      technologies: ['Socket.io', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt'],
      challenges: 'スケーラブルなリアルタイム通信システムの構築',
      solutions: 'Socket.ioのroom機能とRedisを使用したセッション管理で実現',
      features: [
        'リアルタイムメッセージング',
        'グループチャット',
        'ファイル共有',
        'ユーザー認証',
        'オンライン状態表示'
      ]
    }
  }
];