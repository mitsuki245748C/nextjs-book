import { NextResponse } from "next/server";
import { ItemModel } from "../../../../utils/schemaModels";
import connectDB from "../../../../utils/database";

export async function DELETE(request, context) {
    const reqBody = request.json()
    try{
        await connectDB();
        const params = await context.params;
        const singleItem = ItemModel.findById(params.id);
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({_id: params.id})
            return NextResponse.json({message: "アイテム削除成功"});
        }else {
            
            return NextResponse.json({message: "他の人が作成したアイテムです"});
        }
    }catch(err) {
        return NextResponse.json({message: "アイテム削除失敗"});
    }
}