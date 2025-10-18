import Button from "./ui/Button";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/Card";
import PlaceholderArt from "./ui/PlaceholderArt";
import { Badge, ShoppingCart } from "lucide-react";


const NFTCard = ({
    title = "Neon Wave #123",
    price = "1.23 ETH",
    user = "@creator",
    seed = 2
}: {
    title?: string;
    price?: string;
    user?: string;
    seed?: number;
}) => ( 

    <Card className="hover:border-zinc-700 transition-colors">
        <CardContent className="p-4">
            <div className="overflow-hidden rounded-xl">
                <PlaceholderArt seed={seed}/>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                    <h4 className="text-zinc-100 font-medium leading-tight">{title}</h4>
                    <p className="text-zinc-400 text-sm">by {user}</p>
                </div>
                <Badge>{price}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <Button size="sm" className="rounded-xl">Bid now</Button>
                <Button size="sm" variant="outline" className="rounded-xl text-zinc-200">
                    <ShoppingCart className="h-4 w-4 mr-2"/>Add
                </Button>
            </div>
        </CardContent>
    </Card>
)

export default NFTCard;