import dotenv from "dotenv";
dotenv.config()

import express , {Response,Request,Application} from "express";
import { query } from "./dbconfig";



const app:Application = express();
const PORT = process.env.PORT || 8080;

const TRANSPARENT_GIF_BUFFER:Buffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

const BASEURL = process.env.NGROK_URL;
app.use(express.json())


app.get("/", (req: Request, res: Response) : void =>{
    res.json({message: "Goto /url for generating url for the tracking pixel"}).status(200);
})

app.post("/url", async (req: Request, res: Response):Promise<void> => {
    try {
    const {campaign , id} = req.body;
    const {rows} = await query('SELECT * from click_through where campaign = $1 and item = $2',[campaign,id])
    let message:string  = '';
    if(rows.length !== 0){
        message = 'Already exists'
    }else{
        await query('INSERT into click_through(campaign, item) values($1, $2)',[campaign, id])
        message = `${BASEURL}/api/track/${campaign}/${id}`
    }
    res.json({message}).status(200);
    }catch(err){
        res.json({message:"Error occured"}).status(500);
    }
})

app.get("/api/track/:campaign/:id", async (req: Request, res: Response):Promise<void> =>{
    try{
    const {campaign, id} = req.params;
    const time = new Date();
    const {rows} = await query('select id, open from click_through where campaign = $1 and item = $2',[campaign, id]);
    //Increase the count for open
    await query('update click_through set open = $1 where campaign = $2 and item = $3',[rows[0].open+1, campaign, id])    
    //Log the entry for the open time
    await query('insert into click_time(click_id, open_time) values($1, $2)',[rows[0].id, time])
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': TRANSPARENT_GIF_BUFFER.length
    })
    res.end(TRANSPARENT_GIF_BUFFER, 'binary')
    }catch(err){
        res.json({message:"Error occured while rendering"}).status(500);
    }
})



app.listen(PORT ,():void => {
    console.log(`Listening on port ${PORT}`);
})


