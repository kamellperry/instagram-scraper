import Dashboard from '~/components/Dashboard';
import { PageWrapper } from "~/components/global";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from '~/components/ui';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import type { Route } from "./+types/_index";
import type { ProfileData } from '~/lib/types';

export interface LoaderErrorData {
    code: number;
    message: string;
    hint: string;
}

type LoaderResponse = ProfileData[] | LoaderErrorData;

// export async function loader({ }: Route.LoaderArgs) {
//     const response = await fetch("https://eros-co.app.n8n.cloud/webhook-test/17badf3a-b82f-459c-8951-85faf4210229");
//     const data: LoaderResponse = await response.json();

//     return { data };
// }

export default function Page({ loaderData }: Route.ComponentProps) {
    // const { data } = loaderData;

    if (!(data instanceof Array)) {
        const { message, code, hint } = data;

        return <PageError message={message} code={code} hint={hint} />;
    }


    return (
        <Dashboard profiles={data} />
    );
}

function PageError({ message, code, hint }: LoaderErrorData) {
    return (
        <PageWrapper>
            <div className="flex min-h-[70vh] items-center justify-center p-4">
                <Card className="mx-auto max-w-md shadow-lg">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <CardTitle className="text-2xl">Error {code}</CardTitle>
                        </div>
                        <CardDescription className="text-base font-medium text-foreground">{message}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{hint}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                        <Button variant="outline" className="w-full sm:w-auto">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                        <Button className="w-full sm:w-auto">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </PageWrapper>
    );
}

const data = [
    {
        row_number: 2,
        id: '3578190937853467955',
        ownerFullName: 'Anthony Grosso | CPT',
        ownerUsername: 'amg_training',
        url: 'https://www.instagram.com/p/DGoSbMtRx0z/',
        caption: '30 pounds up and feeling good. Perhaps we see 200 soon🫨\n' +
            '\n' +
            ' #gym #motivation #transformation #transform #fitness #personaltrainer #training #onlinecoach #onlinetrainer #weightloss',
        locationName: '',
        postType: 'Sidecar',
        likesCount: 8,
        commentsCount: 0,
        displayUrl: 'https://scontent-ham3-1.cdninstagram.com/v/t51.2885-15/482157692_18483713251059782_213365654324193066_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjg0eDEyODQuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2AGdBCS0y0Zbec0CDJQ_XpMCr5lyw7PwUtPo9LvhKsyiBCgmIh0Q3Zq0bON52AlPzzI&_nc_ohc=cG4cJYuYgBMQ7kNvgFHOPFC&_nc_gid=d5166e011c3d44ed8a76b40af151921a&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3ODE5MDkyNjY2MzA4MTUwMA%3D%3D.3-ccb7-5&oh=00_AYB2Y7w5cXl8JzW4FL7NjAtyb_dPe1XTtqcGcFBFYTbirQ&oe=67C7E7AC&_nc_sid=472314',
        ownerId: 299771781,
        timestamp: '2025-02-28T20:13:41.000Z'
    },
    {
        row_number: 3,
        id: '3576586476314585864',
        ownerFullName: 'Malcolm Solomon',
        ownerUsername: 'malcolmsolomon',
        url: 'https://www.instagram.com/p/DGilnNdMmsI/',
        caption: '🔥 UPPER BODY PUMP ALERT! 🔥\n' +
            '\n' +
            'This dumbbell-only workout will have your shoulders, traps, and biceps screaming for more! 💪 Ready to build strength and definition? Let’s go! 🚀\n' +
            '\n' +
            '🔥 Single Dumbbell Front Raise\n' +
            '🔥 Dumbbell Server Press\n' +
            '🔥 Dumbbell Front Raise Combo\n' +
            '🔥 Alternating Upright Row w/ Shrugs\n' +
            '🔥 Front Raise Isolation Combo\n' +
            '🔥 Hammer Curl Combo\n' +
            '🔥 Cross Body Curls\n' +
            '🔥 Single Arm Dumbbell Curls\n' +
            '\n' +
            'No machines. No excuses. Just pure intensity! \n' +
            '🏋️‍♂️ Tag your workout partner & save this for later! 💯 \n' +
            '\n' +
            '#DumbbellOnly #UpperBodyPump #StrengthInMotion #malcolmsolomon #onlinecoaching #onlinecoach #workoutmotivation #workout #workoutvideos #workoutoftheday #upperbody #upperbodyworkout #dumbbells #dumbbellworkout #traps #shoulders #arms #armsworkout',
        locationName: 'No Location Found',
        postType: 'Video',
        likesCount: 498,
        commentsCount: 30,
        displayUrl: 'https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/481917703_18489238381048862_4242024048467776146_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDE5MjAuc2RyLmY3NTc2MS5kZWZhdWx0X2NvdmVyX2ZyYW1lIn0&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2AHuraOc4-zNUSlBFf1F3r-YF5ezXrjoFHDNdOcvJRyMtsjxYzRyDb8pGmH5LN42siw&_nc_ohc=C1nCTuJhCNIQ7kNvgFJtIWw&_nc_gid=53bdfc62636f438a84a66b68e554d3aa&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3NjU4NjQ3NjMxNDU4NTg2NA%3D%3D.3-ccb7-5&oh=00_AYDhsjr-pYgh84vYLIlYQPVEsyqK7wRBPyk9XhNLK7JR2g&oe=67C7DA9F&_nc_sid=472314',
        ownerId: 209904861,
        timestamp: '2025-02-26T15:08:03.000Z'
    },
    {
        row_number: 4,
        id: '3574389119062996006',
        ownerFullName: 'Malcolm Solomon',
        ownerUsername: 'malcolmsolomon',
        url: 'https://www.instagram.com/p/DGax_dCxXQm/',
        caption: '🔥 Total Core Burn! 🔥\n' +
            '\n' +
            'Today’s workout is all about plank power—building strength, stability, and endurance from every angle! Ready to feel the fire? 🔥💪\n' +
            '\n' +
            'Workout:\n' +
            '✅ Side Plank – 3x30s\n' +
            '✅ Plank Breakdowns – 3x30s\n' +
            '✅ Alternating Arm Lifts – 3x30s\n' +
            '✅ Bear Plank Knee Taps – 3x30s\n' +
            '✅ Tricep Planks – 3x30s\n' +
            '✅ Plank Jacks – 3x30s\n' +
            '✅ Plank Marches – 3x30s\n' +
            '✅ Mountain Climbers – 3x30s\n' +
            '\n' +
            'Save/Share for more plank videos \n' +
            '\n' +
            'Who’s up for the challenge? Drop a 🔥 if you’re in! \n' +
            '\n' +
            '#PlankChallenge #CoreOnFire #StrongerEveryDay #malcolmsolomon #onlinecoaching #onlinecoach #workoutmotivation #workout #workoutvideos #workoutoftheday #workoutroutine #core #coreworkout #corestrength #coretraining #coreexercises #coreworkouts',
        locationName: 'No Location Found',
        postType: 'Video',
        likesCount: 592,
        commentsCount: 48,
        displayUrl: 'https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/481593221_18488692435048862_659451571807234855_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDE5MjAuc2RyLmY3NTc2MS5kZWZhdWx0X2NvdmVyX2ZyYW1lIn0&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2AHuraOc4-zNUSlBFf1F3r-YF5ezXrjoFHDNdOcvJRyMtsjxYzRyDb8pGmH5LN42siw&_nc_ohc=5p2onVtVyj8Q7kNvgFstw8r&_nc_gid=53bdfc62636f438a84a66b68e554d3aa&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3NDM4OTExOTA2Mjk5NjAwNg%3D%3D.3-ccb7-5&oh=00_AYC3ufrvZM9kXd8E8M3aKeL6rqxhGOYuqj4vzWahNNirtA&oe=67C7DAF5&_nc_sid=472314',
        ownerId: 209904861,
        timestamp: '2025-02-23T14:31:52.000Z'
    },
    {
        row_number: 5,
        id: '3575111899856530874',
        ownerFullName: 'Zac Smith - IFBB Pro & Online Coach',
        ownerUsername: 'zacsmithfitness',
        url: 'https://www.instagram.com/p/DGdWVTHOG26/',
        caption: '👀 Don’t over complicate it.. SAVE this↗️\n' +
            '\n' +
            'Simple works! ✅\n' +
            '\n' +
            'Consistency is key 🔑 \n' +
            '\n' +
            'Progressively overload and grow 👌\n' +
            '\n' +
            '#ChestDay #Basics #OnlineCoach #ChestMonday',
        locationName: 'Playa del Carmen, Quintana Roo',
        postType: 'Video',
        likesCount: 1047,
        commentsCount: 23,
        displayUrl: 'https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/481870274_1106934324518319_3551720637768153302_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi42NDB4MTEzNi5zZHIuZjcxODc4Lm5mcmFtZV9jb3Zlcl9mcmFtZSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2AHuraOc4-zNUSlBFf1F3r-YF5ezXrjoFHDNdOcvJRyMtsjxYzRyDb8pGmH5LN42siw&_nc_ohc=a_yMvcf_kBgQ7kNvgGWgj9e&_nc_gid=53bdfc62636f438a84a66b68e554d3aa&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3NTExMTg5OTg1NjUzMDg3NA%3D%3D.3-ccb7-5&oh=00_AYCafSpN7QJXA1Av3wBCrX6_UMeun5uqJULh-zxnEJNZvA&oe=67C7F784&_nc_sid=472314',
        ownerId: 41891950,
        timestamp: '2025-02-24T14:16:56.000Z'
    },
    {
        row_number: 6,
        id: '3578881477544837925',
        ownerFullName: 'Zach Ermert',
        ownerUsername: 'zachactive',
        url: 'https://www.instagram.com/p/DGqvb36SQMl/',
        caption: 'Mindset switch👇🏻\n' +
            '\n' +
            'No longer chasing size- the shift to be lean, functional, athletic, strong, and healthy is the new mindset. The more I embed myself into Physical Therapy, the further I grasp upon my values and my love for fitness as a whole. It’s exploiting my weak points and all I want is to strengthen them and become balanced and unbreakable\n' +
            '\n' +
            'Will be talking about this more in upcoming videos \n' +
            '\n' +
            'Dm me “coach” for 1:1 coaching \n' +
            '\n' +
            '#bodybuilding #bodybuilder #tennis #tennisplayer #fitnessmotivation #fitnesscoach #fitness #gym',
        locationName: 'No Location Found',
        postType: 'Video',
        likesCount: 680,
        commentsCount: 16,
        displayUrl: 'https://scontent-ham3-1.cdninstagram.com/v/t51.2885-15/482372380_18493574584043343_5303437944274689223_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjkweDIyOTQuc2RyLmY3NTc2MS5kZWZhdWx0X2NvdmVyX2ZyYW1lIn0&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2AHrH83ADlXS96eHcQaVf3bw_1xls7LgX18ATZJYM98KkqfuFkZplioOTAxzhcp813k&_nc_ohc=ODwmSdYrRD8Q7kNvgF0MfwC&_nc_gid=d59fbc689b05446bab41c887e867e1ca&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3ODg4MTQ3NzU0NDgzNzkyNTE4NDkzNTc0NTc4MDQzMzQz.3-ccb7-5&oh=00_AYCI2xzbaKfQDxj9SWpSs7k2Gu469iJ8xWpPlx1rQn8RXw&oe=67C956CE&_nc_sid=472314',
        ownerId: 416491342,
        timestamp: '2025-03-01T19:06:57.000Z'
    },
    {
        row_number: 7,
        id: '3577310185301287314',
        ownerFullName: 'Yav',
        ownerUsername: 'yavin.hines',
        url: 'https://www.instagram.com/p/DGlKKj-RSGS/',
        caption: 'Bulking but still want visible abs? 🔥\n' +
            '\n' +
            'Here’s a go-to core routine that keeps my midsection tight and defined even while putting on mass. 🙂‍↕️\n' +
            '\n' +
            'This workout targets the rectus abdominis, obliques, and deep core stabilizers, helping with strength and aesthetics. 💯\n' +
            '\n' +
            'Don’t just train for looks, train for function!📈\n' +
            '\n' +
            'Core strength impacts everything from lifting power to athletic performance. 😤\n' +
            '\n' +
            'Save this and give it a try!🤝🏾\n' +
            '\n' +
            '#explore #ygfit #fit #motivation #fitness #personaltrainer #onlinetrainer #gym #fitnesscoach #homeworkout #abs #absworkout',
        locationName: 'Atlanta, Georgia',
        postType: 'Video',
        likesCount: 947,
        commentsCount: 19,
        displayUrl: 'https://scontent-ham3-1.cdninstagram.com/v/t51.2885-15/482001176_18487351297009926_5367678443130335134_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi43MjB4MTI4MC5zZHIuZjc1NzYxLmRlZmF1bHRfY292ZXJfZnJhbWUifQ&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2AHrH83ADlXS96eHcQaVf3bw_1xls7LgX18ATZJYM98KkqfuFkZplioOTAxzhcp813k&_nc_ohc=hRG0VSR5iwMQ7kNvgH9yiJf&_nc_gid=d59fbc689b05446bab41c887e867e1ca&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3NzMxMDE4NTMwMTI4NzMxNA%3D%3D.3-ccb7-5&oh=00_AYDjbMCyHX_YItfGnup8bpL_I9vKzfDZlMNVLoPJOhoqfQ&oe=67C93B8C&_nc_sid=472314',
        ownerId: 176585925,
        timestamp: '2025-02-27T15:04:40.000Z'
    },
    {
        row_number: 8,
        id: '3578897667397359906',
        ownerFullName: 'Harun Çıtız',
        ownerUsername: 'harunctz',
        url: 'https://www.instagram.com/p/DGqzHd4sZki/',
        caption: 'Daily training is ✅💯🤩👏🏻 #training #workout #motivation #gym #belgium #brussels #brussels🇧🇪 #belgique #personaltrainer #coach #trainingday #workoutmotivation #fit #fitness #fitnesscoach #fitspiration #biceps #reels #instagood',
        locationName: 'Brussels, Belgium',
        postType: 'Video',
        likesCount: 3,
        commentsCount: 2,
        displayUrl: 'https://scontent-ham3-1.cdninstagram.com/v/t51.2885-15/482192382_18492184621038120_6688899964100657025_n.jpg?stp=dst-jpg_e15_p360x360_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi43MjB4MTI4MC5zZHIuZjc1NzYxLmRlZmF1bHRfY292ZXJfZnJhbWUifQ&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2AHrH83ADlXS96eHcQaVf3bw_1xls7LgX18ATZJYM98KkqfuFkZplioOTAxzhcp813k&_nc_ohc=HFLvcrDmX0oQ7kNvgH6_Hv6&_nc_gid=d59fbc689b05446bab41c887e867e1ca&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzU3ODg5NzY2NzM5NzM1OTkwNg%3D%3D.3-ccb7-5&oh=00_AYAc7-kLZcdEehx34QHcOk1oXnWwKYf50KLDEggTd8nnJQ&oe=67C9355B&_nc_sid=472314',
        ownerId: 1529254119,
        timestamp: '2025-03-01T19:38:25.000Z'
    }
];