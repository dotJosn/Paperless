

export default function StarLoader() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='relative h-16 w-16 animate-spin'>
        <div className='-translate-x-1/2 absolute top-0 left-1/2 h-4 w-4 transform rounded-full bg-gray-400' />
        <div className='-translate-y-1/2 absolute top-1/2 right-0 h-4 w-4 transform rounded-full bg-gray-400' />
        <div className='-translate-x-1/2 absolute bottom-0 left-1/2 h-4 w-4 transform rounded-full bg-gray-400' />
        <div className='-translate-y-1/2 absolute top-1/2 left-0 h-4 w-4 transform rounded-full bg-gray-400' />
        <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-6 w-6 transform rounded-full bg-gray-500' />
      </div>
    </div>
  )
}