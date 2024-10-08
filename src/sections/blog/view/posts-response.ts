interface LikeMap {
    [key: string]: boolean;
}

interface Content {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    location: string | null;
    description: string;
    picturePath: string | null;
    userPicturePath: string;
    likes: LikeMap;
    comments: any[];  // Definir tipo específico de comentário, se houver
    urlPicturePath: string | null;
    createdAt: string;
    youtubeEmbedId: string | null;
    twitchEmbedId: string | null;
}

interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
}

interface Pageable {
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PostsResponse {
    content: Content[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
