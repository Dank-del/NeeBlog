import { useRouter } from 'next/router'
import NavBar from '../../components/NavBar'

const Post = () => {
    const router = useRouter()
    const { pid } = router.query

    return (
        <div>
            <NavBar/>
        </div>
    )
}

export default Post