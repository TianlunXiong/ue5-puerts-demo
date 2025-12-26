import * as ue from 'ue'

import { argv } from 'puerts'

const world = (argv.getByName("GameInstance") as ue.GameInstance).GetWorld() as ue.World;

let actorClass = ue.StaticMeshActor.StaticClass();

// 2. 设置生成时的位置和旋转
let location = new ue.Vector(0, 0, 500); // X, Y, Z
let rotation = new ue.Rotator(0, 0, 0);  // P, Y, R
let transform = new ue.Transform(rotation, location, new ue.Vector(1, 1, 1));

let newActor = ue.GameplayStatics.BeginDeferredActorSpawnFromClass(
    world, 
    actorClass, 
    transform, 
) as ue.StaticMeshActor;

if (newActor) {
    let meshAsset = ue.StaticMesh.Load("/Engine/BasicShapes/Cube.Cube");

    let smc = newActor.StaticMeshComponent;
    smc.SetStaticMesh(meshAsset);
    
    // 5. 确保它是可见的，并且移动性正确
    smc.SetMobility(ue.EComponentMobility.Movable);

    // 在这里可以设置 Actor 的属性
    ue.GameplayStatics.FinishSpawningActor(newActor, transform);
    console.log("Actor 生成成功！");
}
